package com.cforgood;

import android.app.Application;
import android.util.Log;

import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.appevents.AppEventsLogger;

import io.branch.rnbranch.*;
import io.branch.referral.Branch;

import io.intercom.android.sdk.Intercom;
//import com.mapbox.mapboxsdk.MapboxAccountManager;

import com.facebook.react.ReactApplication;
import com.react.rnspinkit.RNSpinkitPackage;
import com.mapbox.reactnativemapboxgl.ReactNativeMapboxGLPackage;
import com.rt2zz.reactnativecontacts.ReactNativeContacts;
import com.gettipsi.stripe.StripeReactPackage;
import com.joshblour.reactnativepermissions.ReactNativePermissionsPackage;
import com.evollu.react.fcm.FIRMessagingPackage;
import com.microsoft.codepush.react.CodePush;
import com.robinpowered.react.Intercom.IntercomPackage;
import io.branch.rnbranch.RNBranchPackage;
import com.imagepicker.ImagePickerPackage;
import cl.json.RNSharePackage;
import com.cmcewen.blurview.BlurViewPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.github.yamill.orientation.OrientationPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.ianlin.RNFirebaseCrashReport.RNFirebaseCrashReportPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    FacebookSdk.sdkInitialize(getApplicationContext());
    // If you want to use AppEventsLogger to log events.
    AppEventsLogger.activateApp(this);
    //MapboxAccountManager.start(this, getString(R.string.access_token_mapbox));

    SoLoader.init(this, /* native exopackage */ false);
    Branch.getAutoInstance(this);
    // Intercom.initialize(this, "android_sdk-b8ee00eb87640fa514372617ba00b3a44393abc5", "a7004d3n");
    Intercom.initialize(this, "android_sdk-a01671cf1d5143126c58d791d40acd5", "qpywnvwu");
  }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

    @Override
    protected String getJSBundleFile() {
      return CodePush.getJSBundleFile();
    }

    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }
    //getResources().getString(R.string.reactNativeCodePush_androidDeploymentKey)
    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNSpinkitPackage(),
            new ReactNativeMapboxGLPackage(),
            new ReactNativeContacts(),
            new StripeReactPackage(),
          new ReactNativePermissionsPackage(),
          new FIRMessagingPackage(),
          new RNFirebaseCrashReportPackage(),
          new CodePush(BuildConfig.CODEPUSH_KEY, getApplicationContext(), BuildConfig.DEBUG),
          new IntercomPackage(),
          new RNBranchPackage(),
          new ImagePickerPackage(),
          new RNSharePackage(),
          new BlurViewPackage(),
          new LinearGradientPackage(),
          new VectorIconsPackage(),
          new OrientationPackage(),
          new FBSDKPackage(mCallbackManager),
          new ReactVideoPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

}
