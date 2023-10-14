import 'package:flutter/material.dart';
import 'package:mobile_app/constants.dart';
import 'package:mobile_app/models/user_models.dart';
import 'package:mobile_app/providers/user_provider.dart';
import 'package:provider/provider.dart';

class SideNavBar extends StatefulWidget {
  @override
  _SideNavBarState createState() => _SideNavBarState();
}

class _SideNavBarState extends State<SideNavBar> {
  Future<PassengerProfileModel> profileData;
  PassengerProfileModel _passengerData;

  void initState() {
    super.initState();
    if (Provider.of<UserActionsProvider>(context, listen: false)
            .passengerData !=
        null) {
      _passengerData = Provider.of<UserActionsProvider>(context, listen: false)
          .passengerData;
    } else {
      profileData = context.read<UserActionsProvider>().getUserProfile();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Material(
      child: ListView(
        children: <Widget>[
          _passengerData != null
              ? UserAccountsDrawerHeader(
                  accountName: Text(
                    _passengerData.firstName + ' ' + _passengerData.lastName,
                    style: TextStyle(
                      fontFamily: INTER_REGULAR,
                      fontSize: 18,
                    ),
                  ),
                  accountEmail: Text(_passengerData.email),
                  currentAccountPicture: CircleAvatar(
                    child: ClipOval(
                      child: Image.network(
                        _passengerData.imageUrl,
                        width: 90,
                        height: 90,
                        fit: BoxFit.cover,
                      ),
                    ),
                  ),
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.only(
                      bottomRight: Radius.circular(20),
                    ),
                    image: DecorationImage(
                      colorFilter: ColorFilter.mode(
                        Colors.black.withOpacity(1),
                        BlendMode.dstATop,
                      ),
                      image: AssetImage('assets/images/side_menu_header.png'),
                      fit: BoxFit.cover,
                    ),
                  ),
                )
              : FutureBuilder<PassengerProfileModel>(
                  future: profileData,
                  builder: (context, snapshot) {
                    if (snapshot.hasData) {
                      return UserAccountsDrawerHeader(
                        accountName: Text(
                          snapshot.data.firstName +
                              ' ' +
                              snapshot.data.lastName,
                          style: TextStyle(
                            fontFamily: INTER_REGULAR,
                            fontSize: 18,
                          ),
                        ),
                        accountEmail: Text(snapshot.data.email),
                        currentAccountPicture: CircleAvatar(
                          child: ClipOval(
                            child: Image.network(
                              snapshot.data.imageUrl,
                              width: 90,
                              height: 90,
                              fit: BoxFit.cover,
                            ),
                          ),
                        ),
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.only(
                            bottomRight: Radius.circular(20),
                          ),
                          image: DecorationImage(
                            colorFilter: ColorFilter.mode(
                              Colors.black.withOpacity(1),
                              BlendMode.dstATop,
                            ),
                            image: AssetImage(
                                'assets/images/side_menu_header.png'),
                            fit: BoxFit.cover,
                          ),
                        ),
                      );
                    } else if (snapshot.hasError) {
                      return Text(snapshot.error.toString());
                    }
                    return Text('');
                  },
                ),
          Padding(
            padding: const EdgeInsets.only(left: 16, top: 10),
            child: Text(
              'Services',
              style: TextStyle(
                fontFamily: INTER_MEDIUM,
                fontWeight: FontWeight.w600,
                fontSize: 17,
                color: Colors.black54,
              ),
            ),
          ),
          buildMenuItem(
            icon: Icons.home,
            text: 'Home',
            onClicked: () => Navigator.pushNamed(context, '/home'),
            isNotificationIndicator: false,
          ),
          buildMenuItem(
            icon: Icons.card_travel_rounded,
            text: 'Card Info',
            onClicked: () => Navigator.pushNamed(context, '/manage-smart-card'),
            isNotificationIndicator: false,
          ),
          buildMenuItem(
            icon: Icons.history,
            text: 'My Trip History',
            onClicked: () => Navigator.pushNamed(context, '/home'),
            isNotificationIndicator: false,
          ),
          buildMenuItem(
            icon: Icons.money,
            text: 'Recharge Card',
            onClicked: () => Navigator.pushNamed(context, '/recharge'),
            isNotificationIndicator: false,
          ),
          buildMenuItem(
            icon: Icons.location_on,
            text: 'Recharge Points',
            onClicked: () => Navigator.pushNamed(context, '/recharge-points'),
            isNotificationIndicator: false,
          ),
          Divider(),
          Padding(
            padding: const EdgeInsets.only(left: 16, top: 10),
            child: Text(
              'Actions',
              style: TextStyle(
                fontFamily: INTER_MEDIUM,
                fontWeight: FontWeight.w600,
                fontSize: 17,
                color: Colors.black54,
              ),
            ),
          ),
          buildMenuItem(
            icon: Icons.person_add,
            text: 'Sign Up',
            onClicked: () => Navigator.pushNamed(context, '/signup'),
            isNotificationIndicator: false,
          ),
          buildMenuItem(
            icon: Icons.fingerprint,
            text: 'Login',
            onClicked: () => Navigator.pushNamed(context, '/login'),
            isNotificationIndicator: false,
          ),
        ],
      ),
    );
  }

  Widget buildMenuItem(
      {String text,
      IconData icon,
      VoidCallback onClicked,
      bool isNotificationIndicator}) {
    return ListTile(
      leading: Icon(
        icon,
        size: 25,
      ),
      title: Text(
        text,
        style: TextStyle(
          fontFamily: INTER_REGULAR,
          fontSize: 16,
          fontWeight: FontWeight.w500,
        ),
      ),
      onTap: onClicked,
      trailing: isNotificationIndicator
          ? ClipOval(
              child: Container(
                color: Color(PRIMARY_COLOR),
                width: 20,
                height: 20,
                child: Center(
                  child: Text(
                    '4',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 12,
                    ),
                  ),
                ),
              ),
            )
          : Text(''),
    );
  }
}
