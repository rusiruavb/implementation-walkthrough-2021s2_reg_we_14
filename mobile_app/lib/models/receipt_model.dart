import 'package:intl/intl.dart';

class ReceiptModel {
  String createdAt;
  String packageName;
  int price;
  String cardNumber;

  ReceiptModel({this.cardNumber, this.createdAt, this.packageName, this.price});

  factory ReceiptModel.fromJson(Map<String, dynamic> json) {
    return ReceiptModel(
      cardNumber: json['data']['cardNumber'],
      createdAt: json['data']['createdAt'],
      packageName: json['data']['packageName'],
      price: json['walletData']['availableAmount'],
    );
  }
}
