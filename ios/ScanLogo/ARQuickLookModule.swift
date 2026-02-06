import Foundation
import QuickLook
import React

@objc(ARQuickLookModule)
class ARQuickLookModule: NSObject {
  
  @objc
  func presentARQuickLook(_ filePath: String, resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) {
    DispatchQueue.main.async {
      // Parse the URL - supports both file:// and https:// URLs
      var url: URL?
      
      if filePath.hasPrefix("file://") {
        url = URL(string: filePath)
      } else if filePath.hasPrefix("https://") || filePath.hasPrefix("http://") {
        url = URL(string: filePath)
      } else {
        // Assume it's a file path without scheme
        url = URL(fileURLWithPath: filePath)
      }
      
      guard let validUrl = url else {
        rejecter("INVALID_URL", "Invalid file path provided: \(filePath)", nil)
        return
      }
      
      print("🚀 ARQuickLook opening URL: \(validUrl)")
      
      // Get the root view controller
      guard let rootViewController = UIApplication.shared.windows.first?.rootViewController else {
        rejecter("NO_VIEW_CONTROLLER", "Could not find root view controller", nil)
        return
      }
      
      // Find the top-most view controller
      var topController = rootViewController
      while let presented = topController.presentedViewController {
        topController = presented
      }
      
      // Create and present the QLPreviewController
      let previewController = ARQuickLookPreviewController()
      previewController.dataSource = ARQuickLookDataSource(fileURL: validUrl)
      previewController.delegate = ARQuickLookDelegate()
      
      topController.present(previewController, animated: true) {
        print("✅ ARQuickLook presented successfully")
        resolver(true)
      }
    }
  }
  
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
}

// MARK: - QLPreviewController Subclass
class ARQuickLookPreviewController: QLPreviewController {
  override func viewDidLoad() {
    super.viewDidLoad()
  }
}

// MARK: - Data Source
class ARQuickLookDataSource: NSObject, QLPreviewControllerDataSource {
  let fileURL: URL
  
  init(fileURL: URL) {
    self.fileURL = fileURL
  }
  
  func numberOfPreviewItems(in controller: QLPreviewController) -> Int {
    return 1
  }
  
  func previewController(_ controller: QLPreviewController, previewItemAt index: Int) -> QLPreviewItem {
    return fileURL as QLPreviewItem
  }
}

// MARK: - Delegate
class ARQuickLookDelegate: NSObject, QLPreviewControllerDelegate {
  func previewControllerWillDismiss(_ controller: QLPreviewController) {
    // Handle dismissal if needed
  }
}
