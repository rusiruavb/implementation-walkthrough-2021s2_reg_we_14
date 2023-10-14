#### User - DONE

id - String
nic - String
email - String
firstName - String
lastName - String
password - String
mobileNumber - String
routeList - [Array of route ids]
licenseNumber - String
permitNumber - String
token - String

#### Routes - DONE

routeId - String
startingLocation - String
destination - String
startingTime - Date
destinationTime - Date
tespasserCount - Number // Need to know
managerId - ref to User ['Manager']
inspectorId - ref to User ['Inspector']

#### Trip - DONE PARTIALLY

tripId - String
date - Date
distance - Number
startLocation - String
destination - String
passengers - [Array of User ids]
vehicleId - ref to Vehicle

#### Report

reportId - String
generatedDate - Date
trips - [ref to Trips]
managerId = ref to User ['Manager']

#### Vehicle - DONE

vehicleId - String
driver - ref to User ['Driver']
routeList - [ref to Routes ]
type - ['TRAIN', 'METRO', 'BUS']
numberOfCoaches - Number
capacityPerCoach - Number
metroCapacity - Number
isPublic - Boolean [default - false]
numberOfSeats - Number
registrationNumber - String

#### Digital Wallet - DONE

id - String
availableAmount - Number
initialDepositAmount - Number
isLoan - Boolean [default - false]
reload - [ref to Reload]
loan - ref to Loan

#### Reload - DONE

id - String
amount - Number
date - Date
location - ref to Reload Location
digitalWalletId - ref to Digital Wallet

#### Reload Location

id - String
name - String
location - String

#### Loan

loanId - String
loanAmount - Number
date - Date
digitalWalletId - ref to Digital Wallet

#### Pass Card

paymentId - String
tripId - ref to Trip
date - Date
type - ['DAY PASS', 'SMART CARD', 'FOREIGN EXPRESS PASS']
amount - Number
cardNumber - String
securityNumber - Number
passengerId - ref to User ['Passenger', 'Foreign Passenger']

#### Card

[daypass
smart card
forign express].
