import 'package:flutter/material.dart';
import 'package:mobile_app/components/navigation_menu/side_navigation.dart';
import 'package:mobile_app/models/user_models.dart';
import 'package:mobile_app/providers/recharge_point_provider.dart';
import 'package:mobile_app/providers/smart_card_provider.dart';
import 'package:mobile_app/providers/user_provider.dart';
import 'package:mobile_app/screens/recharge_points/recharge_points_content.dart';
import 'package:provider/provider.dart';

import '../../../constants.dart';

class RechargePointScreen extends StatefulWidget {
  @override
  _RechargeSmartCardScreenState createState() =>
      _RechargeSmartCardScreenState();
}

class _RechargeSmartCardScreenState extends State<RechargePointScreen> {
  Future<PassengerProfileModel> profileData;
  PassengerProfileModel _passengerData;
  final _scaffoldKey =
      GlobalKey<ScaffoldState>(debugLabel: 'rechargeScreenKey');

  void initState() {
    super.initState();
    context.read<SmartCardProvider>().getSmartCard();
    if (Provider.of<UserActionsProvider>(context, listen: false)
            .passengerData !=
        null) {
      print('Get data from the store');
      _passengerData = Provider.of<UserActionsProvider>(context, listen: false)
          .passengerData;
    } else {
      profileData = context.read<UserActionsProvider>().getUserProfile();
    }
  }

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;

    return Scaffold(
      key: _scaffoldKey,
      drawer: Container(
        width: size.width * 0.8,
        child: Drawer(
          elevation: 0.0,
          child: SideNavBar(),
        ),
      ),
      appBar: AppBar(
        title: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              'TravelGo ',
              style: TextStyle(fontFamily: INTER_MEDIUM),
            ),
            Icon(Icons.train_sharp)
          ],
        ),
        backgroundColor: Color(PRIMARY_COLOR),
        actions: [
          PopupMenuButton(
            offset: Offset(-5, 50),
            onSelected: (value) {
              if (value == 'logout') {
                print(value);
              }
            },
            itemBuilder: (context) => [
              PopupMenuItem(
                child: Row(
                  children: <Widget>[
                    Icon(
                      Icons.exit_to_app_rounded,
                      color: Colors.black,
                    ),
                    Padding(
                      padding: const EdgeInsets.only(left: 8),
                      child: Text('Logout'),
                    ),
                  ],
                ),
                value: 'logout',
              )
            ],
            child: IconButton(
              icon: _passengerData != null
                  ? ClipOval(
                      child: Image.network(
                        _passengerData.imageUrl,
                        fit: BoxFit.cover,
                      ),
                    )
                  : FutureBuilder<PassengerProfileModel>(
                      future: profileData,
                      builder: (context, snapshot) {
                        if (snapshot.hasData) {
                          return ClipOval(
                            child: Image.network(
                              snapshot.data.imageUrl,
                              fit: BoxFit.cover,
                            ),
                          );
                        } else if (snapshot.hasError) {
                          return Text(snapshot.error.toString());
                        }
                        return Text('');
                      },
                    ),
            ),
          ),
        ],
      ),
      // bottomNavigationBar: NavigationBar(),
      body: Stack(
        children: <Widget>[
          SingleChildScrollView(
            child: Container(
              color: Colors.white,
              width: size.width,
              child: Padding(
                padding: EdgeInsets.only(top: 10),
                child: RechargePoints(),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
