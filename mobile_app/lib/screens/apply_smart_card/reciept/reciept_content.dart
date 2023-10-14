import 'package:mobile_app/components/buttons/rounded_button.dart';
import 'package:mobile_app/constants.dart';
import 'package:mobile_app/providers/smart_card_provider.dart';
import 'package:provider/provider.dart';
import 'package:flutter/material.dart';
import 'package:barcode/barcode.dart';
import 'package:syncfusion_flutter_barcodes/barcodes.dart';

class ReciptContent extends StatefulWidget {
  @override
  _RecieptContentState createState() => _RecieptContentState();
}

class _RecieptContentState extends State<ReciptContent> {
  dynamic buildBarCode(Barcode bc, String securityCode) {
    return bc.toSvg(securityCode, width: 200, height: 100);
  }

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;

    return Container(
      padding: EdgeInsets.only(left: 20, right: 20, bottom: 20, top: 20),
      width: size.width * 0.9,
      child: Column(
        children: [
          Card(
            elevation: 3,
            child: Column(
              children: <Widget>[
                Row(
                  children: <Widget>[
                    Padding(
                      padding: const EdgeInsets.all(12),
                      child: Text(
                        context.read<SmartCardProvider>().receiptData.createdAt,
                        style: TextStyle(
                          fontFamily: INTER_REGULAR,
                          fontSize: 18,
                        ),
                      ),
                    )
                  ],
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: <Widget>[
                    Text(
                      'RECEIPT',
                      style: TextStyle(
                        fontFamily: INTER_BOLD,
                        fontSize: 22,
                      ),
                    ),
                  ],
                ),
                Align(
                  alignment: Alignment.center,
                  child: Divider(
                    color: Colors.black,
                    indent: 20,
                    endIndent: 20,
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(top: 15, left: 20, right: 20),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: <Widget>[
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: <Widget>[
                          Text(
                            'Package',
                            style: TextStyle(
                              fontFamily: INTER_REGULAR,
                              fontSize: 18,
                            ),
                          )
                        ],
                      ),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.end,
                        children: <Widget>[
                          Text(
                            context
                                .read<SmartCardProvider>()
                                .receiptData
                                .packageName,
                            style: TextStyle(
                              fontFamily: INTER_REGULAR,
                              fontSize: 18,
                            ),
                          )
                        ],
                      ),
                    ],
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(top: 15, left: 20, right: 20),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: <Widget>[
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: <Widget>[
                          Text(
                            'Amount',
                            style: TextStyle(
                              fontFamily: INTER_REGULAR,
                              fontSize: 18,
                            ),
                          )
                        ],
                      ),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.end,
                        children: <Widget>[
                          Text(
                            'Rs.' +
                                context
                                    .read<SmartCardProvider>()
                                    .receiptData
                                    .price
                                    .toDouble()
                                    .toStringAsFixed(2),
                            style: TextStyle(
                              fontFamily: INTER_REGULAR,
                              fontSize: 18,
                            ),
                          )
                        ],
                      ),
                    ],
                  ),
                ),
                Align(
                  alignment: Alignment.center,
                  child: Divider(
                    color: Colors.black,
                    indent: 20,
                    endIndent: 20,
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(
                      top: 15, left: 20, right: 20, bottom: 10),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: <Widget>[
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: <Widget>[
                          Text(
                            'Total',
                            style: TextStyle(
                              fontFamily: INTER_REGULAR,
                              fontSize: 22,
                            ),
                          )
                        ],
                      ),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.end,
                        children: <Widget>[
                          Text(
                            'Rs.' +
                                context
                                    .read<SmartCardProvider>()
                                    .receiptData
                                    .price
                                    .toDouble()
                                    .toStringAsFixed(2),
                            style: TextStyle(
                              fontFamily: INTER_BOLD,
                              fontSize: 22,
                            ),
                          )
                        ],
                      ),
                    ],
                  ),
                ),
                Align(
                  alignment: Alignment.center,
                  child: Divider(
                    color: Colors.black,
                    indent: 20,
                    endIndent: 20,
                  ),
                ),
                SizedBox(
                  height: 20,
                ),
                Container(
                  height: 80,
                  child: SfBarcodeGenerator(
                    value: context
                        .read<SmartCardProvider>()
                        .receiptData
                        .cardNumber,
                  ),
                ),
                SizedBox(
                  height: 20,
                ),
                Padding(
                  padding: const EdgeInsets.only(left: 20, right: 20),
                  child: Text(
                    'Tap this bar code when you enter and exit from the vehicle. This will use to calculate your fare.',
                    style: TextStyle(
                      fontFamily: INTER_REGULAR,
                      fontSize: 13,
                      color: Colors.red,
                    ),
                  ),
                ),
                SizedBox(
                  height: 20,
                ),
              ],
            ),
          ),
          SizedBox(
            height: 30,
          ),
          RoundedButton(
            color: Color(PRIMARY_COLOR),
            fontSize: 18,
            height: 60,
            textColor: Colors.white,
            width: size.width,
            loadingText: 'Navigating',
            text: 'Home',
            action: () {
              Navigator.pushNamed(context, '/home');
            },
          ),
          SizedBox(
            height: 8,
          ),
        ],
      ),
    );
  }
}
