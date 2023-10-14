import 'package:flutter/material.dart';
import 'package:mobile_app/constants.dart';
import 'package:mobile_app/screens/home/home_screen.dart';
import 'package:mobile_app/screens/manage_smart_card/manage_smart_card_screen.dart';
import 'package:mobile_app/screens/recharge_points/recharge_point_screen.dart';
import 'package:mobile_app/screens/recharge_smart_card/recharge_screen.dart';

class NavigationBar extends StatefulWidget {
  @override
  __NavigationBarState createState() => __NavigationBarState();
}

class __NavigationBarState extends State<NavigationBar> {
  int selectedIndex = 0;
  final screens = [
    HomeScreen(),
    ManageSmartCardScreen(),
    RechargePointScreen(),
    RechargeSmartCardScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    return BottomNavigationBar(
      currentIndex: selectedIndex,
      onTap: (index) => setState(() => selectedIndex = index),
      selectedItemColor: Colors.white,
      items: [
        BottomNavigationBarItem(
          icon: Icon(Icons.home),
          label: 'Home',
          backgroundColor: Color(SECONDARY_COLOR_01),
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.card_travel_rounded),
          label: 'Card Info',
          backgroundColor: Color(SECONDARY_COLOR_01),
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.history),
          label: 'My Trip History',
          backgroundColor: Color(SECONDARY_COLOR_01),
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.change_circle),
          label: 'Recharge Card',
          backgroundColor: Color(SECONDARY_COLOR_01),
        ),
      ],
    );
  }
}
