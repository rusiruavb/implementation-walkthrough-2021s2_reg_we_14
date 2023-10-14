### Project Structure

#### Use case 01

Digital wallet : Need to pay initial amount (Rs. 500.00)
-> Update paid amount in **Smart Card**
-> When user exit from the bus
_ Calculate start & exit distance
_ Send distance to the backend
_ Calculate price (distance _ _Defined amount_)
-> Validation

### Database models

**Passenger Model** - CRUD
firstName
lastName
email
userName
contactNumber
password
address
profileImageURL

**Trip History Model** CR
tripId
startLocation
exitLocation
amount
date
distance
status

**Recharge Points Model** CRUD
pointId
address
distance

**Package Data** CR
name
amount

**Smart Card** CRUD
cardId
packageId [Foreign key]
availableBalance
createdDate
isLoanAvailable [Boolean]
loanAmount
loanTakenDateTime

**Employee** CRUD
firstName
lastName
email
nic
contactNumber
routes [Route Array]

**Vehicles** CRUD
vehicleCode
number
driver
noOfSeats
startLocation
endLocation
startTime
destinationTime
numberOfTerns
vehicleType [BUS, METRO, TRAIN]

-- Additional function
topUpSmartCard()
dayPassCalculator()
applyLoad()
availableBalance()
updateBalance()
makePayment()
distanceCalcualtor()
