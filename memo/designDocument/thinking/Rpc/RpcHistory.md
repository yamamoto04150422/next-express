# RPC的な通信の歴史

## 1970〜1980年代

- **RPCの概念誕生**
  - 1970年代後半〜1980年代に研究が進む。
  - 1984年：Bruce Jay Nelson の論文 _Implementing Remote Procedure Calls_ により理論的に確立。
  - 「リモートにある処理を、ローカル関数のように呼ぶ」思想がここで確立。

## 1980〜1990年代

- **分散システムで利用**
  - Sun Microsystems の **ONC RPC**（1984）
  - Apolloの NCS RPC
  - DCE RPC（Distributed Computing Environment）
  - 企業内ネットワークで分散処理の基盤として広がる。

## 1990年代後半〜2000年代

- **Webサービスの時代**
  - 1998〜2000頃：**XML-RPC** 誕生（XML形式でRPCを実現）。
  - その発展系として **SOAP**（Simple Object Access Protocol）が登場。
  - SOAPはXMLベースで、WS-\* 規格とあわせて企業システム連携に利用された。

## 2010年代以降

- **軽量化・高速化の流れ**
  - **JSON-RPC**（軽量でWebアプリに親和性が高い）
  - **gRPC**（2015年にGoogleが公開、HTTP/2 + Protocol Buffers）
  - モバイルやマイクロサービスで再注目。

---

## まとめ

- RPC思想自体は **1980年代にはすでに存在**。
- **XML-RPC / SOAP** はその後（1998〜2000年頃）、Web時代に「RPC的通信」をXMLで表現した実装のひとつ。
- つまり  
  **「SOAP通信のときに生まれた」わけではなく、SOAPはRPCの一実装に過ぎない。**
