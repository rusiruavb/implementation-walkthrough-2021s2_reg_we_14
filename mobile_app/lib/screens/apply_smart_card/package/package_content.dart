import 'package:flutter/material.dart';
import 'package:mobile_app/constants.dart';
import 'package:mobile_app/providers/smart_card_provider.dart';
import 'package:provider/provider.dart';

class Packages extends StatefulWidget {
  @override
  _PackagesState createState() => _PackagesState();
}

class _PackagesState extends State<Packages> {
  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;

    return Container(
      padding: EdgeInsets.all(10),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: <Widget>[
          Text(
            'Select Your Package',
            style: TextStyle(
              fontFamily: INTER_BOLD,
              fontSize: 26,
            ),
          ),
          SizedBox(
            height: 10,
          ),
          PackageCard(
            title: 'Bronze Package',
            imagePath: 'assets/images/bronz_package.png',
            description:
                'Great value way to see experience \nthis sell-out 7s event.',
            fontSize: 22,
            bottom: -32,
            right: -80,
            imageScale: 10,
            price: 500,
            color: Color(0xffCE905C),
            width: size.width * 0.9,
          ),
          SizedBox(
            height: 10,
          ),
          PackageCard(
            title: 'Silver Package',
            imagePath: 'assets/images/silver_package.png',
            description:
                'Great value way to see experience \nthis sell-out 7s event.',
            fontSize: 22,
            bottom: -35,
            right: -50,
            imageScale: 10,
            price: 1000,
            color: Color(0xff8C8C8C),
            width: size.width * 0.9,
          ),
          SizedBox(
            height: 10,
          ),
          PackageCard(
            title: 'Gold Package',
            imagePath: 'assets/images/gold_package.png',
            description:
                'Great value way to see experience \nthis sell-out 7s event.',
            fontSize: 22,
            bottom: -8,
            right: -40,
            imageScale: 12,
            price: 1500,
            color: Color(0xffFFDC30),
            width: size.width * 0.9,
          ),
          SizedBox(
            height: 10,
          ),
          PackageCard(
            title: 'Platinum Package',
            imagePath: 'assets/images/platinum_package.png',
            description:
                'Great value way to see experience \nthis sell-out 7s event.',
            fontSize: 22,
            bottom: -30,
            right: -40,
            imageScale: 10,
            price: 2500,
            color: Color(0xffD0D0D0),
            width: size.width * 0.9,
          ),
        ],
      ),
    );
  }

  Widget PackageCard({
    String title,
    String imagePath,
    double price,
    String description,
    double imageScale,
    double width,
    double fontSize,
    double bottom,
    double right,
    Color color,
  }) {
    return Container(
      decoration: BoxDecoration(
        boxShadow: [
          BoxShadow(
            color: Color(SECONDARY_COLOR_02),
            blurRadius: 20,
            spreadRadius: -22,
            offset: Offset(5.0, 5.0),
          )
        ],
      ),
      width: width,
      height: 150,
      child: Card(
        clipBehavior: Clip.antiAlias,
        color: color,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20),
        ),
        child: InkWell(
          onTap: () {
            context.read<SmartCardProvider>().setPackageName(title);
            context.read<SmartCardProvider>().setPackagePrice(price);
            Navigator.pushNamed(context, '/payment');
          },
          child: Stack(
            children: <Widget>[
              Positioned(
                right: right,
                bottom: bottom,
                child: Padding(
                  padding: const EdgeInsets.only(right: 10),
                  child: Image.asset(
                    imagePath,
                    scale: imageScale,
                  ),
                ),
              ),
              Column(
                children: <Widget>[
                  Row(
                    children: <Widget>[
                      Padding(
                        padding: const EdgeInsets.only(top: 20, left: 20),
                        child: Text(
                          title,
                          style: TextStyle(
                            fontFamily: SANSATION_REGULAR,
                            fontSize: fontSize,
                            fontWeight: FontWeight.w600,
                            color: Colors.black,
                          ),
                        ),
                      ),
                    ],
                  ),
                  Row(
                    children: <Widget>[
                      Padding(
                        padding: const EdgeInsets.only(top: 5, left: 20),
                        child: Text(
                          description,
                          style: TextStyle(
                            fontFamily: SANSATION_REGULAR,
                            fontSize: 15,
                            fontWeight: FontWeight.w500,
                            color: Colors.black,
                          ),
                        ),
                      ),
                    ],
                  ),
                  Row(
                    children: <Widget>[
                      Padding(
                        padding: const EdgeInsets.only(top: 10, left: 20),
                        child: Text(
                          'LKR.' + price.toString() + '.00',
                          style: TextStyle(
                            fontFamily: SANSATION_REGULAR,
                            fontSize: 28,
                            fontWeight: FontWeight.w900,
                            color: Colors.black,
                          ),
                        ),
                      ),
                    ],
                  )
                ],
              )
            ],
          ),
        ),
      ),
    );
  }
}
