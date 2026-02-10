package com.scanlogo

import android.content.Intent
import android.net.Uri
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap

class ARViewerModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "ARViewerModule"
    }

    @ReactMethod
    fun openARView(modelUrl: String, title: String, promise: Promise) {
        try {
            val activity = reactApplicationContext.currentActivity
            if (activity == null) {
                promise.reject("ACTIVITY_NOT_FOUND", "Current activity not found")
                return
            }

            // Use Scene Viewer with 3D preview mode
            // This shows 3D model first with "View in your space" AR button
            val sceneViewerIntent = Intent(Intent.ACTION_VIEW)
            val intentUri = Uri.parse("https://arvr.google.com/scene-viewer/1.0")
                .buildUpon()
                .appendQueryParameter("file", modelUrl)
                .appendQueryParameter("mode", "3d_preferred")  // Shows 3D first, then AR button
                .appendQueryParameter("title", title)
                .appendQueryParameter("resizable", "true")
                .appendQueryParameter("enable_vertical_placement", "true")
                .build()
            
            sceneViewerIntent.data = intentUri
            sceneViewerIntent.setPackage("com.google.android.googlequicksearchbox")
            
            activity.startActivity(sceneViewerIntent)
            promise.resolve("3D Viewer opened successfully")
        } catch (e: Exception) {
            promise.reject("AR_ERROR", "Failed to open 3D viewer: ${e.message}", e)
        }
    }

    @ReactMethod
    fun isARSupported(promise: Promise) {
        try {
            val activity = reactApplicationContext.currentActivity
            if (activity == null) {
                promise.resolve(false)
                return
            }

            val testIntent = Intent(Intent.ACTION_VIEW)
            testIntent.data = Uri.parse("https://arvr.google.com/scene-viewer/1.0")
            testIntent.setPackage("com.google.ar.core")
            
            val isSupported = testIntent.resolveActivity(activity.packageManager) != null
            promise.resolve(isSupported)
        } catch (e: Exception) {
            promise.resolve(false)
        }
    }
}
