# 1. Di root library
yarn install           # pastikan dependensi lengkap
yarn clean             # opsional, bersih-bersih
yarn pack:local        # => menghasilkan react-native-dial-ussd.tgz dgn folder lib/ lengkap

# 2. Di project React Native lain
yarn add ../react-native-dial-ussd/react-native-dial-ussd.tgz
# atau npm install ../react-native-dial-ussd/react-native-dial-ussd.tgz
yarn ios   # lalu pod install untuk iOS
yarn android