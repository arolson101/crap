package com.crap;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.bitgo.randombytes.RandomBytesPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;
import org.pgsqlite.SQLitePluginPackage;
import com.reactnativenavigation.NavigationApplication;

public class MainApplication extends NavigationApplication implements ReactApplication {
  @Override
  public boolean isDebug() {
      return BuildConfig.DEBUG;
  }

  @Override
  public List<ReactPackage> createAdditionalReactPackages() {
      return Arrays.<ReactPackage>asList(
        new SQLitePluginPackage(),
        new RandomBytesPackage()
        // eg. new VectorIconsPackage()
      );
  }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new SQLitePluginPackage(),
          new MainReactPackage(),
          new RandomBytesPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
