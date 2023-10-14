import 'package:flutter/material.dart';
import 'package:mobile_app/components/buttons/rounded_button.dart';
import 'package:mobile_app/constants.dart';
import 'package:mobile_app/models/smart_card_model.dart';
import 'package:mobile_app/providers/smart_card_provider.dart';
import 'package:mobile_app/screens/manage_smart_card/smart_card.dart';
import 'package:provider/provider.dart';

class SmartCardContent extends StatefulWidget {
  @override
  _SmartCardContentState createState() => _SmartCardContentState();
}

class _SmartCardContentState extends State<SmartCardContent> {
  Future<SmartCardModel> smartCardData;
  @override
  void initState() {
    super.initState();
    smartCardData = context.read<SmartCardProvider>().getSmartCard();
  }

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;

    return Container(
      height: size.height * 0.87,
      child: Column(
        children: [
          FutureBuilder<SmartCardModel>(
            future: smartCardData,
            builder: (context, snapshot) {
              if (snapshot.hasData) {
                return Column(
                  children: [
                    Row(
                      children: [
                        SmartCard(
                          cardNumber: snapshot.data.cardNumber,
                          cardType: snapshot.data.cardType,
                          packageName: snapshot.data.packageName,
                          securityNumber: snapshot.data.securityNumber,
                          isLoanTaken: snapshot.data.isLoanTaken,
                          initialAmount: snapshot.data.initialAmount,
                          availableAmount: snapshot.data.availableAmout,
                          createdAt: snapshot.data.createdAt,
                        ),
                      ],
                    ),
                    !snapshot.data.isLoanTaken
                        ? Row(
                            children: <Widget>[
                              Padding(
                                padding: const EdgeInsets.all(10.0),
                                child: RoundedButton(
                                  color: Color(SECONDARY_COLOR_01),
                                  fontSize: 20,
                                  height: 60,
                                  width: size.width * 0.94,
                                  text: 'Take a Loan',
                                  textColor: Colors.white,
                                  action: () {
                                    print('clicked');
                                  },
                                ),
                              )
                            ],
                          )
                        : Text(''),
                  ],
                );
              } else if (snapshot.hasError) {
                return Text(snapshot.error.toString());
              }
              return Container(
                width: 25,
                height: 25,
                child: CircularProgressIndicator(
                  color: Color(PRIMARY_COLOR),
                  strokeWidth: 3,
                ),
              );
            },
          ),
        ],
      ),
    );
  }
}
