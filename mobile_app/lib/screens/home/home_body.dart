import 'package:flutter/material.dart';
import 'package:mobile_app/constants.dart';

class HomeBody extends StatefulWidget {
  @override
  _HomeBodyState createState() => _HomeBodyState();
}

class _HomeBodyState extends State<HomeBody> {
  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;

    return Container(
      child: Column(
        children: <Widget>[
          buildHomeItem(
            text: 'Apply for \nSmart Card',
            imagePath: 'assets/images/apply_smart_card.png',
            imageScale: 10,
            fontSize: 26,
            bottom: -50,
            right: -50,
            routeName: '/apply-smart-card',
            width: size.width * 0.9,
          ),
          SizedBox(
            height: 10,
          ),
          Padding(
            padding: const EdgeInsets.only(left: 20, right: 20),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: <Widget>[
                Column(
                  children: <Widget>[
                    buildHomeItem(
                      text: 'View \nSmart Card',
                      imagePath: 'assets/images/manage_smart_card.png',
                      imageScale: 13,
                      fontSize: 23,
                      right: -38,
                      bottom: -35,
                      routeName: '/manage-smart-card',
                      width: size.width * 0.43,
                    )
                  ],
                ),
                Column(
                  children: <Widget>[
                    buildHomeItem(
                      text: 'Recharge \nSmart \nCard',
                      imagePath: 'assets/images/recharge_points.png',
                      routeName: '/recharge',
                      imageScale: 20,
                      fontSize: 23,
                      right: -10,
                      bottom: -10,
                      width: size.width * 0.43,
                    )
                  ],
                ),
              ],
            ),
          ),
          // SizedBox(
          //   height: 10,
          // ),
          // buildHomeItem(
          //   text: 'View  My Trip \nHistory',
          //   imagePath: 'assets/images/view_trip_history.png',
          //   imageScale: 12,
          //   fontSize: 26,
          //   bottom: -10,
          //   right: -10,
          //   width: size.width * 0.9,
          // ),
          SizedBox(
            height: 10,
          ),
          buildHomeItem(
            text: 'Recharge \nLocations',
            imagePath: 'assets/images/recharge_location.png',
            routeName: '/recharge-points',
            imageScale: 7,
            fontSize: 26,
            bottom: -80,
            right: -80,
            width: size.width * 0.9,
          ),
          SizedBox(
            height: 10,
          ),
          buildHomeItem(
            text: 'Apply for \nForeign Pass',
            imagePath: 'assets/images/foreign_pass.png',
            imageScale: 9,
            fontSize: 26,
            bottom: -80,
            right: -40,
            width: size.width * 0.9,
          ),
          SizedBox(
            height: 20,
          ),
        ],
      ),
    );
  }

  Widget buildHomeItem({
    String text,
    String imagePath,
    double imageScale,
    double width,
    double fontSize,
    double bottom,
    double right,
    String routeName,
  }) {
    final size = MediaQuery.of(context).size;

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
        color: Color(SECONDARY_COLOR_03),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20),
        ),
        child: InkWell(
          onTap: () {
            Navigator.pushNamed(context, routeName);
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
              Padding(
                padding: const EdgeInsets.only(top: 20, left: 20),
                child: Text(
                  text,
                  style: TextStyle(
                    fontFamily: SANSATION_REGULAR,
                    fontSize: fontSize,
                    fontWeight: FontWeight.w600,
                    color: Color(PRIMARY_COLOR),
                  ),
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
