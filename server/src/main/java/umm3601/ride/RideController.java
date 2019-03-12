package umm3601.ride;

import com.mongodb.MongoException;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.bson.types.ObjectId;

import java.util.Iterator;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static com.mongodb.client.model.Filters.eq;

/**
 * Controller that manages requests for info about users.
 */
public class RideController {

  private final MongoCollection<Document> rideCollection;

  /**
   * Construct a controller for users.
   *
   * @param database the database containing user data
   */
  public RideController(MongoDatabase database) {

    rideCollection = database.getCollection("rides");
  }

  /**
   * Helper method that gets a single user specified by the `id`
   * parameter in the request.
   *
   * @param id the Mongo ID of the desired user
   * @return the desired user as a JSON object if the user with that ID is found,
   * and `null` if no user with that ID is found
   */
  public String getRide(String id) {
    FindIterable<Document> jsonRides
      = rideCollection
      .find(eq("_id", new ObjectId(id)));

    Iterator<Document> iterator = jsonRides.iterator();
    if (iterator.hasNext()) {
      Document ride = iterator.next();
      return ride.toJson();
    } else {
      return null;
    }
  }


  /**
   * Helper method which iterates through the collection, receiving all
   * documents if no query parameter is specified. If the age query parameter
   * is specified, then the collection is filtered so only documents of that
   * specified age are found.
   *
   * @param queryParams the query parameters from the request
   * @return an array of Users in a JSON formatted string
   */
  public String getRides(Map<String, String[]> queryParams) {

    Document filterDoc = new Document();
//
//    if (queryParams.containsKey("age")) {
//      int targetAge = Integer.parseInt(queryParams.get("age")[0]);
//      filterDoc = filterDoc.append("age", targetAge);
//    }
//
//    if (queryParams.containsKey("company")) {
//      String targetContent = (queryParams.get("company")[0]);
//      Document contentRegQuery = new Document();
//      contentRegQuery.append("$regex", targetContent);
//      contentRegQuery.append("$options", "i");
//      filterDoc = filterDoc.append("company", contentRegQuery);
//    }

    //FindIterable comes from mongo, Document comes from Gson
    FindIterable<Document> matchingRiders = rideCollection.find(filterDoc);

    return serializeIterable(matchingRiders);
  }

  /*
   * Take an iterable collection of documents, turn each into JSON string
   * using `document.toJson`, and then join those strings into a single
   * string representing an array of JSON objects.
   */
  private String serializeIterable(Iterable<Document> documents) {
    return StreamSupport.stream(documents.spliterator(), false)
      .map(Document::toJson)
      .collect(Collectors.joining(", ", "[", "]"));
  }


  public String addNewRide(String driver, String destination, String origin, String departure) {

    Document newRide = new Document();
    newRide.append("driver", driver);
    newRide.append("destintion", destination);
    newRide.append("origin", origin);
    newRide.append("departure", departure);

    try {
      rideCollection.insertOne(newRide);
      ObjectId id = newRide.getObjectId("_id");
      System.err.println("Successfully added new ride [_id=" + id + ", driver=" + driver + ", destintion=" + destination + " origin=" + origin + " departure=" + departure + ']');
      return id.toHexString();
    } catch (MongoException me) {
      me.printStackTrace();
      return null;
    }
  }
}
