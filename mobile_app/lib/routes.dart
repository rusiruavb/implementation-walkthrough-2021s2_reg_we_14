import 'package:flutter/material.dart';
import 'package:mobile_app/screens/apply_smart_card/package/packages_screen.dart';
import 'package:mobile_app/screens/apply_smart_card/payment/payment_screen.dart';
import 'package:mobile_app/screens/apply_smart_card/reciept/reciept_screen.dart';
import 'package:mobile_app/screens/home/home_screen.dart';
import 'dart:math' as math;

import 'package:mobile_app/screens/login/login_screen.dart';
import 'package:mobile_app/screens/manage_smart_card/manage_smart_card_screen.dart';
import 'package:mobile_app/screens/recharge_points/recharge_point_screen.dart';
import 'package:mobile_app/screens/recharge_points/recharge_points_content.dart';
import 'package:mobile_app/screens/recharge_smart_card/recharge_screen.dart';
import 'package:mobile_app/screens/signup/signup_screen.dart';

class RouteGenerator {
  static Route<dynamic> generateRoute(RouteSettings settings) {
    final arguments = settings.arguments;

    switch (settings.name) {
      case '/home':
        return PageRouteBuilder(
          settings: settings,
          pageBuilder: (_, __, ___) => HomeScreen(),
          transitionsBuilder: (_, a, __, c) => FadeTransition(
            opacity: a,
            child: c,
          ),
        );
      case '/signup':
        return PageRouteBuilder(
          settings: settings,
          pageBuilder: (_, __, ___) => SignUpScreen(),
          transitionsBuilder: (_, a, __, c) => FadeTransition(
            opacity: a,
            child: c,
          ),
        );
      case '/login':
        return PageRouteBuilder(
          settings: settings,
          pageBuilder: (_, __, ___) => LoginScreen(),
          transitionsBuilder: (_, a, __, c) => FadeTransition(
            opacity: a,
            child: c,
          ),
        );
      case '/apply-smart-card':
        return PageRouteBuilder(
          settings: settings,
          pageBuilder: (_, __, ___) => PackagesScreen(),
          transitionsBuilder: (_, a, __, c) => FadeTransition(
            opacity: a,
            child: c,
          ),
        );
      case '/payment':
        return PageRouteBuilder(
          settings: settings,
          pageBuilder: (_, __, ___) => PaymentScreen(),
          transitionsBuilder: (_, a, __, c) => FadeTransition(
            opacity: a,
            child: c,
          ),
        );
      case '/receipt':
        return PageRouteBuilder(
          settings: settings,
          pageBuilder: (_, __, ___) => RecieptScreen(),
          transitionsBuilder: (_, a, __, c) => FadeTransition(
            opacity: a,
            child: c,
          ),
        );
      case '/manage-smart-card':
        return PageRouteBuilder(
          settings: settings,
          pageBuilder: (_, __, ___) => ManageSmartCardScreen(),
          transitionsBuilder: (_, a, __, c) => FadeTransition(
            opacity: a,
            child: c,
          ),
        );
      case '/recharge':
        return PageRouteBuilder(
          settings: settings,
          pageBuilder: (_, __, ___) => RechargeSmartCardScreen(),
          transitionsBuilder: (_, a, __, c) => FadeTransition(
            opacity: a,
            child: c,
          ),
        );
      case '/recharge-points':
        return PageRouteBuilder(
          settings: settings,
          pageBuilder: (_, __, ___) => RechargePointScreen(),
          transitionsBuilder: (_, a, __, c) => FadeTransition(
            opacity: a,
            child: c,
          ),
        );
      default:
        return _errorRoute();
    }
  }

  static Route<dynamic> _errorRoute() {
    return MaterialPageRoute(builder: (_) {
      return Scaffold(
        appBar: AppBar(
          elevation: 0,
          automaticallyImplyLeading: false,
          backgroundColor: Colors.red[900],
          leading: IconButton(
            icon: Transform(
              alignment: Alignment.center,
              transform: Matrix4.rotationY(math.pi),
              child: Icon(Icons.segment_rounded),
            ),
            onPressed: () {
              print('Error Route');
            },
          ),
        ),
        body: Center(
          child: Text(
            'Dear Customer, this is wrong route',
            style: TextStyle(
              fontFamily: 'Larsseit',
              fontSize: 25,
            ),
          ),
        ),
      );
    });
  }
}
