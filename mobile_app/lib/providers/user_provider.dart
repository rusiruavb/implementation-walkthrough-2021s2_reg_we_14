import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:http/http.dart' as http;
import 'package:mobile_app/models/user_models.dart';
import 'package:mobile_app/providers/api_endpoints.dart';

class UserActionsProvider with ChangeNotifier {
  final storage = new FlutterSecureStorage();
  PassengerProfileModel passengerData;
  bool isLoading = false;

  void setIsLoading(bool value) {
    this.isLoading = value;
    notifyListeners();
  }

  bool getIsLoading() {
    return this.isLoading;
  }

  void login(String email, String password, BuildContext context) async {
    final loginResponse = await http.post(
      Uri.parse(CustomerLoginPath),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: jsonEncode(<String, String>{
        'email': email,
        'password': password,
      }),
    );

    if (loginResponse.statusCode == 201) {
      notifyListeners();
      final data = jsonDecode(loginResponse.body);
      var loginData = new LoginModel.fromJson(data);
      print(loginData.email);

      final token = await storage.read(key: 'token');

      if (token != null) {
        await storage.deleteAll();
      }
      await storage.write(key: 'token', value: loginData.token);
      await storage.write(key: 'user_id', value: loginData.userId);
      await storage.write(key: 'email', value: loginData.email);
      await storage.write(key: 'role', value: loginData.role);
      Fluttertoast.showToast(
        msg: 'Login Success',
      );
      Navigator.pushNamed(context, '/home');
      setIsLoading(false);
      notifyListeners();
      this.getUserProfile();
    } else {
      print('Fail');
      setIsLoading(false);
      notifyListeners();
      Fluttertoast.showToast(
        msg: 'Email or password is wrong',
      );
    }
  }

  void register(String fistName, String lastName, String email, String password,
      String role, String phoneNumber, String nic, String gender) async {
    final registerResponse = await http.post(
      Uri.parse(CustomerRegisterPath),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: jsonEncode(<String, String>{
        'firstName': fistName,
        'lastName': lastName,
        'email': email,
        'password': password,
        'phoneNumber': phoneNumber,
        'role': role,
        'nic': nic,
        'gender': gender,
      }),
    );

    if (registerResponse.statusCode == 201) {
      notifyListeners();
      final data = jsonDecode(registerResponse.body);
      var userData = SignUpModel.fromJson(data);
      await storage.write(key: 'token', value: userData.token);
      await storage.write(key: 'user_id', value: userData.userId);
      await storage.write(key: 'email', value: userData.email);
      await storage.write(key: 'role', value: userData.role);
      Fluttertoast.showToast(
        msg: 'Registratin Success!',
      );
    } else {
      Fluttertoast.showToast(
        msg: 'Error with create user',
      );
    }
  }

  Future<PassengerProfileModel> getUserProfile() async {
    final authToken = await storage.read(key: 'token');

    if (authToken != null) {
      print('called');
      final profileResponse = await http.get(
        Uri.parse(GetCustomerProfile),
        headers: {'Authorization': authToken},
      );

      if (profileResponse.statusCode == 201) {
        notifyListeners();
        final data = jsonDecode(profileResponse.body);
        passengerData = new PassengerProfileModel.fromJson(data);
        return passengerData;
      } else {
        Fluttertoast.showToast(
          msg: 'Problem with get your account',
        );
        return null;
      }
    } else {
      Fluttertoast.showToast(
        msg: 'Authentication token is not found. Please login',
      );
      return null;
    }
  }

  PassengerProfileModel getPassengerProfile() {
    return this.passengerData;
  }
}
