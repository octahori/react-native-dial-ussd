package com.dialussd

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import android.content.Intent
import android.net.Uri
import android.Manifest
import android.content.pm.PackageManager
import androidx.core.content.ContextCompat

class DialUssdModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String {
    return NAME
  }

  // Example method
  // See https://reactnative.dev/docs/native-modules-android
  @ReactMethod
  fun multiply(a: Double, b: Double, promise: Promise) {
    promise.resolve(a * b)
  }

  /**
   * Dial a USSD code. The code should include '*' and '#', e.g. "*123#".
   * This implementation simply fires an ACTION_CALL intent. It requires the CALL_PHONE runtime permission.
   */
  @ReactMethod
  fun dialUssd(code: String, promise: Promise) {
    try {
      val context = reactApplicationContext
      if (ContextCompat.checkSelfPermission(context, Manifest.permission.CALL_PHONE) != PackageManager.PERMISSION_GRANTED) {
        promise.reject("E_PERMISSION", "CALL_PHONE permission not granted")
        return
      }
      val encodedHash = Uri.encode("#")
      val uriString = "tel:" + code.replace("#", encodedHash)
      val callIntent = Intent(Intent.ACTION_CALL, Uri.parse(uriString))
      callIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
      context.startActivity(callIntent)
      promise.resolve(null)
    } catch (e: Exception) {
      promise.reject("E_FAILED", e.message, e)
    }
  }

  companion object {
    const val NAME = "DialUssd"
  }
}
