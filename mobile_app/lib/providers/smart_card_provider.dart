import 'dart:convert';

import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
import 'package:mobile_app/models/receipt_model.dart';
import 'package:mobile_app/models/smart_card_model.dart';
import 'package:mobile_app/providers/api_endpoints.dart';

class SmartCardProvider with ChangeNotifier {
  double packagePrice = 0.00;
  String packageName = 'Gold Package';
  String cardNumber = '0000 0000 0000 0000';
  String cardHolderName = 'Card Holder Name';
  String cvc = '000';
  bool isLoading = false;
  String expireDate = '00/00';
  ReceiptModel receiptData;
  SmartCardModel smartCardData;
  // entered values
  String enteredCardNumber;
  String enteredCardHolderName;
  String enteredCVC;
  String enteredExpireDate;
  double selectedPackagePrice;

  void resetState() {
    packagePrice = 0.00;
    packageName = 'Gold Package';
    cardNumber = '0000 0000 0000 0000';
    cardHolderName = 'Card Holder Name';
    cvc = '000';
    expireDate = '00/00';
    enteredCardNumber = null;
    enteredCardHolderName = null;
    enteredCVC = null;
    enteredExpireDate = null;
  }

  void setIsLoading(bool value) {
    this.isLoading = value;
    print(this.isLoading);
    notifyListeners();
  }

  bool getIsLoading() {
    return this.isLoading;
  }

  void setExpireDate(String date) {
    this.expireDate = date;
    this.enteredExpireDate = date;
    notifyListeners();
  }

  void setPackageName(String packName) {
    this.packageName = packName;
    notifyListeners();
  }

  void setCardHolderName(String name) {
    this.cardHolderName = name;
    this.enteredCardHolderName = name;
    notifyListeners();
  }

  void setPackagePrice(double price) {
    this.packagePrice = price;
    this.selectedPackagePrice = price;
    notifyListeners();
  }

  void setCardNumber(String number) {
    this.cardNumber = number;
    this.enteredCardNumber = number;
    notifyListeners();
  }

  void setCVC(String cvc) {
    this.cvc = cvc;
    this.enteredCVC = cvc;
    notifyListeners();
  }

  void createStartCard(
      String cardNumber,
      String cvc,
      String expireMonth,
      String expireYear,
      double amount,
      String packageName,
      BuildContext context) async {
    final authToken = await FlutterSecureStorage().read(key: 'token');

    if (authToken != null) {
      print('object');
      Map<String, dynamic> smartCardData = {
        'cardNumber': cardNumber,
        'expireMonth': expireMonth,
        'expireYear': expireYear,
        'cvc': cvc,
        'amount': amount.toString(),
        'packageName': packageName,
      };
      print('here');
      final responseData = await http.post(
        Uri.parse(CreateSmartCard),
        headers: {'Authorization': authToken},
        body: smartCardData,
      );

      if (responseData.statusCode == 201) {
        notifyListeners();
        final data = jsonDecode(responseData.body);
        receiptData = new ReceiptModel.fromJson(data);
        this.isLoading = false;
        Navigator.pushNamed(context, '/receipt');
      } else if (responseData.statusCode == 400) {
        Fluttertoast.showToast(
          msg: 'Cannot process the payment. Please try again.',
        );
      }
    } else {
      Fluttertoast.showToast(
        msg: 'Authentication token is not found. Please login',
      );
    }
  }

  Future<SmartCardModel> getSmartCard() async {
    final authToken = await FlutterSecureStorage().read(key: 'token');

    if (authToken != null) {
      final responseData = await http.get(
        Uri.parse(GetSmartCard),
        headers: {'Authorization': authToken},
      );

      if (responseData.statusCode == 201) {
        final data = jsonDecode(responseData.body);
        smartCardData = new SmartCardModel.fromJson(data);
        print(smartCardData.cardType);
        return smartCardData;
      } else {
        Fluttertoast.showToast(
          msg: 'Smart card information cannot fetch.',
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
}
