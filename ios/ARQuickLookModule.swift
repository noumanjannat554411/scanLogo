import Foundation
import QuickLook
import React

@objc(ARQuickLookModule)
class ARQuickLookModule: NSObject {
  
  @objc
  func presentARQuickLook(_ filePath: String, resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) {
    DispatchQueue.main.async {
      guard let url = URL(string: filePath) else {
        rejecter("INVALID_URL", "Invalid file path provided", nil)
        return
      }
      
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
      previewController.dataSource = ARQuickLookDataSource(fileURL: url)
      previewController.delegate = ARQuickLookDelegate()
      
      topController.present(previewController, animated: true) {
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
