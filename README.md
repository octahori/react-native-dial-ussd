## 1. Membangun & Mem-pack Library (root)

```bash
yarn install            # pasang dependensi
yarn clean              # opsional, bersih-bersih
yarn pack:local         # menghasilkan react-native-dial-ussd.tgz beserta folder lib/
```

## 2. Menggunakan di Proyek React Native lain

```bash
yarn add ../react-native-dial-ussd/react-native-dial-ussd.tgz  # or npm install ../react-native-dial-ussd/react-native-dial-ussd.tgz
yarn ios      # lalu pod install untuk iOS
yarn android
```

atau

```bash
yarn install             # pastikan dependensi lengkap
yarn clean               # optional
yarn build               # menjalankan bob build → membuat folder lib/
yarn pack --filename react-native-dial-ussd.tgz   # pastikan lib ada di dalam react-native-dial-ussd.tgz

yarn add file:../react-native-dial-ussd/react-native-dial-ussd.tgz

yarn ios   # lalu pod install untuk iOS
yarn android