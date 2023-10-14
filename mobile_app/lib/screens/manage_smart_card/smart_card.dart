import 'package:badges/badges.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';
import 'package:syncfusion_flutter_barcodes/barcodes.dart';

import '../../constants.dart';

class SmartCard extends StatefulWidget {
  final String cardType;
  final String packageName;
  final String cardNumber;
  final String securityNumber;
  final String createdAt;
  final int initialAmount;
  final int availableAmount;
  final bool isLoanTaken;

  const SmartCard({
    this.cardType,
    this.packageName,
    this.cardNumber,
    this.securityNumber,
    this.createdAt,
    this.initialAmount,
    this.availableAmount,
    this.isLoanTaken,
  });

  @override
  _SmartCardState createState() => _SmartCardState(
        cardType: cardType,
        packageName: packageName,
        cardNumber: cardNumber,
        securityNumber: securityNumber,
        createdAt: createdAt,
        initialAmount: initialAmount,
        availableAmount: availableAmount,
        isLoanTaken: isLoanTaken,
      );
}

class _SmartCardState extends State<SmartCard> {
  final String cardType;
  final String packageName;
  final String cardNumber;
  final String securityNumber;
  final String createdAt;
  final int initialAmount;
  final int availableAmount;
  final bool isLoanTaken;

  _SmartCardState({
    this.cardType,
    this.packageName,
    this.cardNumber,
    this.securityNumber,
    this.createdAt,
    this.initialAmount,
    this.availableAmount,
    this.isLoanTaken,
  });

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;

    return Container(
      padding: EdgeInsets.all(10),
      decoration: BoxDecoration(
        boxShadow: [
          BoxShadow(
            color: Color(SECONDARY_COLOR_02),
            blurRadius: 12,
            spreadRadius: -22,
            offset: Offset(2.0, 2.0),
          ),
        ],
      ),
      width: size.width,
      child: Card(
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(10),
        ),
        child: Padding(
          padding: const EdgeInsets.all(10.0),
          child: Column(
            children: <Widget>[
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  Text(
                    'Smart Card Infomation',
                    style: TextStyle(
                      fontFamily: INTER_MEDIUM,
                      fontSize: 19,
                    ),
                  ),
                ],
              ),
              Divider(),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: <Widget>[
                  Text(
                    'Package',
                    style: TextStyle(
                      fontFamily: INTER_REGULAR,
                      fontSize: 18,
                    ),
                  ),
                  Text(
                    packageName,
                    style: TextStyle(
                      fontFamily: INTER_REGULAR,
                      fontSize: 18,
                    ),
                  )
                ],
              ),
              SizedBox(
                height: 10,
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: <Widget>[
                  Text(
                    'Card No.',
                    style: TextStyle(
                      fontFamily: INTER_REGULAR,
                      fontSize: 18,
                    ),
                  ),
                  Text(
                    cardNumber,
                    style: TextStyle(
                      fontFamily: INTER_REGULAR,
                      fontSize: 18,
                    ),
                  )
                ],
              ),
              SizedBox(
                height: 10,
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: <Widget>[
                  Text(
                    'Puchase Date',
                    style: TextStyle(
                      fontFamily: INTER_REGULAR,
                      fontSize: 18,
                    ),
                  ),
                  Text(
                    createdAt.split('T')[0],
                    style: TextStyle(
                      fontFamily: INTER_REGULAR,
                      fontSize: 18,
                    ),
                  )
                ],
              ),
              SizedBox(
                height: 10,
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: <Widget>[
                  Text(
                    'Initial Deposited Amount',
                    style: TextStyle(
                      fontFamily: INTER_REGULAR,
                      fontSize: 18,
                    ),
                  ),
                  Text(
                    'Rs.' + initialAmount.toDouble().toStringAsFixed(2),
                    style: TextStyle(
                      fontFamily: INTER_REGULAR,
                      fontSize: 18,
                    ),
                  )
                ],
              ),
              SizedBox(
                height: 10,
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: <Widget>[
                  Text(
                    'Loan Service',
                    style: TextStyle(
                      fontFamily: INTER_REGULAR,
                      fontSize: 18,
                    ),
                  ),
                  isLoanTaken
                      ? Badge(
                          shape: BadgeShape.square,
                          toAnimate: false,
                          borderRadius: BorderRadius.circular(15),
                          badgeColor: Colors.yellow[800],
                          padding: EdgeInsets.only(
                            left: 10,
                            right: 10,
                            top: 5,
                            bottom: 5,
                          ),
                          badgeContent: Text(
                            'TAKEN',
                            style: TextStyle(
                              fontFamily: INTER_BOLD,
                              fontSize: 15,
                              color: Colors.white,
                            ),
                          ),
                        )
                      : Badge(
                          shape: BadgeShape.square,
                          toAnimate: false,
                          borderRadius: BorderRadius.circular(15),
                          badgeColor: Colors.green,
                          padding: EdgeInsets.only(
                            left: 10,
                            right: 10,
                            top: 5,
                            bottom: 5,
                          ),
                          badgeContent: Text(
                            'AVAILABLE',
                            style: TextStyle(
                              fontFamily: INTER_MEDIUM,
                              fontSize: 15,
                              color: Colors.black,
                            ),
                          ),
                        )
                ],
              ),
              Divider(),
              SizedBox(
                height: 10,
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: <Widget>[
                  Text(
                    'Available Amount',
                    style: TextStyle(
                        fontFamily: INTER_REGULAR,
                        fontSize: 21,
                        fontWeight: FontWeight.bold),
                  ),
                  Text(
                    'Rs.' + availableAmount.toDouble().toStringAsFixed(2),
                    style: TextStyle(
                      fontFamily: INTER_REGULAR,
                      fontSize: 21,
                      fontWeight: FontWeight.bold,
                    ),
                  )
                ],
              ),
              SizedBox(
                height: 10,
              ),
              Container(
                height: 230,
                child: SfBarcodeGenerator(
                  value: securityNumber,
                  symbology: QRCode(),
                  showValue: true,
                ),
              ),
              SizedBox(
                height: 10,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
