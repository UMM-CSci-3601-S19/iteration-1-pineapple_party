package umm3601.ride;

import com.mongodb.BasicDBObject;
import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.*;
import org.bson.codecs.*;
import org.bson.codecs.configuration.CodecRegistries;
import org.bson.codecs.configuration.CodecRegistry;
import org.bson.json.JsonReader;
import org.bson.types.ObjectId;
import org.junit.Before;
import org.junit.Test;

import java.util.*;
import java.util.stream.Collectors;

import static org.junit.Assert.*;

public class RideControllerSpec {
  private RideController rideController;
  private ObjectId samsId;

  @Before
  public void clearAndPopulateDB() {
    MongoClient mongoClient = new MongoClient();
    MongoDatabase db = mongoClient.getDatabase("test");
    MongoCollection<Document> rideDocuments = db.getCollection("rides");
    rideDocuments.drop();
    List<Document> testRides = new ArrayList<>();
    testRides.add(Document.parse("{\n" +
      "                    driver: \"Bob\",\n" +
      "                    destination: \"Willies\",\n" +
      "                    origin: \"Campus\",\n" +
      "                    departure: \"3:45PM\"\n" +
      "                }"));
    testRides.add(Document.parse("{\n" +
      "                    driver: \"Bobby\",\n" +
      "                    destination: \"Bremer\",\n" +
      "                    origin: \"Campus\",\n" +
      "                    departure: \"8:45PM\"\n" +
      "                }"));
    testRides.add(Document.parse("{\n" +
      "                    driver: \"Fran\",\n" +
      "                    destination: \"St Cloud\",\n" +
      "                    origin: \"4th street\",\n" +
      "                    departure: \"20:45\"\n" +
      "                }"));

    samsId = new ObjectId();
    BasicDBObject sam = new BasicDBObject("_id", samsId);
    sam = sam.append("driver", "Sam")
      .append("destination", "St Cloud")
      .append("origin", "Willies")
      .append("departure", "7:45PM");


    rideDocuments.insertMany(testRides);
    rideDocuments.insertOne(Document.parse(sam.toJson()));

    // It might be important to construct this _after_ the DB is set up
    // in case there are bits in the constructor that care about the state
    // of the database.
    rideController = new RideController(db);
  }

  // http://stackoverflow.com/questions/34436952/json-parse-equivalent-in-mongo-driver-3-x-for-java
  private BsonArray parseJsonArray(String json) {
    final CodecRegistry codecRegistry
      = CodecRegistries.fromProviders(Arrays.asList(
      new ValueCodecProvider(),
      new BsonValueCodecProvider(),
      new DocumentCodecProvider()));

    JsonReader reader = new JsonReader(json);
    BsonArrayCodec arrayReader = new BsonArrayCodec(codecRegistry);

    return arrayReader.decode(reader, DecoderContext.builder().build());
  }

  private static String getDriver(BsonValue val) {
    BsonDocument doc = val.asDocument();
    return ((BsonString) doc.get("driver")).getValue();
  }

  @Test
  public void getAllRides() {
    Map<String, String[]> emptyMap = new HashMap<>();
    String jsonResult = rideController.getRides(emptyMap);
    BsonArray docs = parseJsonArray(jsonResult);

    assertEquals("Should be 4 rides", 4, docs.size());
    List<String> drivers = docs
      .stream()
      .map(RideControllerSpec::getDriver)
      .sorted()
      .collect(Collectors.toList());
    List<String> expectedDrivers = Arrays.asList("Bob", "Bobby", "Fran", "Sam");
    assertEquals("Drivers should match", expectedDrivers, drivers);
  }

  @Test
  public void getDriversWhoAreGoingToWillies() {
    Map<String, String[]> argMap = new HashMap<>();
    argMap.put("destination", new String[]{"St Cloud"});
    String jsonResult = rideController.getRides(argMap);
    BsonArray docs = parseJsonArray(jsonResult);

    assertEquals("Should be 2 rides", 2, docs.size());
    List<String> drivers = docs
      .stream()
      .map(RideControllerSpec::getDriver)
      .sorted()
      .collect(Collectors.toList());
    List<String> expectedDrivers = Arrays.asList("Fran", "Sam");
    assertEquals("Drivers should match", expectedDrivers, drivers);
  }

  @Test
  public void getSamById() {
    String jsonResult = rideController.getRide(samsId.toHexString());
    Document sam = Document.parse(jsonResult);
    assertEquals("Driver should match", "Sam", sam.get("driver"));
    String noJsonResult = rideController.getRide(new ObjectId().toString());
    assertNull("No name should match", noJsonResult);

  }

  @Test
  public void addRideTest() {
    String newId = rideController.addNewRide("Brian", "Taco Johns", "Campus", "6/28/2019 17:45");

    assertNotNull("Add new ride should return true when ride is added,", newId);
    Map<String, String[]> argMap = new HashMap<>();
    argMap.put("destination", new String[]{"Taco Johns"});
    String jsonResult = rideController.getRides(argMap);
    BsonArray docs = parseJsonArray(jsonResult);

    List<String> driver = docs
      .stream()
      .map(RideControllerSpec::getDriver)
      .sorted()
      .collect(Collectors.toList());
    assertEquals("Should return name of new driver", "Brian", driver.get(0));
  }
}
