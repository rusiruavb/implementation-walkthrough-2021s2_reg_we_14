import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:mobile_app/constants.dart';
import 'package:mobile_app/providers/recharge_point_provider.dart';
import 'package:mobile_app/providers/smart_card_provider.dart';
import 'package:mobile_app/providers/user_provider.dart';
import 'package:mobile_app/routes.dart';
import 'package:mobile_app/screens/apply_smart_card/reciept/reciept_screen.dart';
import 'package:mobile_app/screens/home/home_screen.dart';
import 'package:mobile_app/screens/login/login_screen.dart';
import 'package:provider/provider.dart';

void main() => runApp(
      MultiProvider(
        providers: [
          ChangeNotifierProvider(create: (_) => UserActionsProvider()),
          ChangeNotifierProvider(create: (_) => SmartCardProvider()),
          ChangeNotifierProvider(create: (_) => RechargePointProvider()),
        ],
        child: TravelGoApp(),
      ),
    );

class TravelGoApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    SystemChrome.setSystemUIOverlayStyle(SystemUiOverlayStyle(
      statusBarColor: Colors.transparent,
    ));
    SystemChrome.setPreferredOrientations([
      DeviceOrientation.portraitUp,
      DeviceOrientation.portraitDown,
    ]);
    SystemChrome.setSystemUIOverlayStyle(SystemUiOverlayStyle(
      // navigation bar color
      statusBarColor: Color(PRIMARY_COLOR), // status bar color
    ));
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Center(
        child: HomeScreen(),
      ),
      onGenerateRoute: RouteGenerator.generateRoute,
    );
  }
}
