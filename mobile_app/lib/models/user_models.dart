class SignUpModel {
  String userId;
  String email;
  String token;
  String role;

  SignUpModel({this.email, this.userId, this.role, this.token});

  factory SignUpModel.fromJson(Map<String, dynamic> json) {
    return SignUpModel(
      userId: json['user_id'],
      email: json['email'],
      token: json['token'],
      role: json['role'],
    );
  }
}

class LoginModel {
  String userId;
  String email;
  String token;
  String role;

  LoginModel({this.email, this.userId, this.role, this.token});

  factory LoginModel.fromJson(Map<String, dynamic> json) {
    return LoginModel(
      userId: json['user_id'],
      email: json['email'],
      token: json['token'],
      role: json['role'],
    );
  }
}

class PassengerProfileModel {
  String userId;
  String firstName;
  String lastName;
  String email;
  int mobileNumber;
  String nic;
  String imageUrl;
  String token;
  String role;

  PassengerProfileModel({
    this.userId,
    this.firstName,
    this.lastName,
    this.email,
    this.mobileNumber,
    this.imageUrl,
    this.nic,
    this.role,
    this.token,
  });

  factory PassengerProfileModel.fromJson(Map<String, dynamic> json) {
    return PassengerProfileModel(
      userId: json['_id'],
      firstName: json['firstName'],
      lastName: json['lastName'],
      email: json['email'],
      mobileNumber: json['mobileNumber'],
      imageUrl: json['imageUrl'],
      nic: json['nic'],
      role: json['role'],
      token: json['token'],
    );
  }
}
