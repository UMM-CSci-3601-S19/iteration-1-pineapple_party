package umm3601.ride;

import org.bson.Document;
import spark.Request;
import spark.Response;
import umm3601.ride.RideController;

public class RideRequestHandler {

  private final RideController rideController;

  public RideRequestHandler(RideController rideController) {
    this.rideController = rideController;
  }

  public String getRideJSON(Request req, Response res) {
    res.type("application/json");
    String id = req.params("id");
    String ride;
    try {
      ride = rideController.getRide(id);
    } catch (IllegalArgumentException e) {
      // This is thrown if the ID doesn't have the appropriate
      // form for a Mongo Object ID.
      // https://docs.mongodb.com/manual/reference/method/ObjectId/
      res.status(400);
      res.body("The requested ride id " + id + " wasn't a legal Mongo Object ID.\n" +
        "See 'https://docs.mongodb.com/manual/reference/method/ObjectId/' for more info.");
      return "";
    }
    if (ride != null) {
      return ride;
    } else {
      res.status(404);
      res.body("The requested ride with id " + id + " was not found");
      return "";
    }
  }


  /**
   * Method called from Server when the 'api/users' endpoint is received.
   * This handles the request received and the response
   * that will be sent back.
   *
   * @param req the HTTP request
   * @param res the HTTP response
   * @return an array of users in JSON formatted String
   */
  public String getRides(Request req, Response res) {
    res.type("application/json");
    return rideController.getRiders(req.queryMap().toMap());
  }


  /**
   * Method called from Server when the 'api/users/new' endpoint is received.
   * Gets specified user info from request and calls addNewUser helper method
   * to append that info to a document
   *
   * @param req the HTTP request
   * @param res the HTTP response
   * @return a boolean as whether the user was added successfully or not
//   */
//  public String addNewRide(Request req, Response res) {
//    res.type("application/json");
//
//    Document newRide = Document.parse(req.body());
//
//    String name = newUser.getString("name");
//    int age = newUser.getInteger("age");
//    String company = newUser.getString("company");
//    String email = newUser.getString("email");
//
//    System.err.println("Adding new user [name=" + name + ", age=" + age + " company=" + company + " email=" + email + ']');
//    return userController.addNewUser(name, age, company, email);
//  }
}

