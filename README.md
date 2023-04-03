# Tipro

我的前端練習最終作品 - "[Tipro](https://tipro-app.onrender.com)"

### 目錄

- [專案主旨](#專案主旨)
- [專案功能](#專案功能)
- [專案介紹](#專案介紹)
- [專案使用相關套件](#專案使用相關套件)
***

### 專案主旨

"**Tipro**" 是一個完整的項目管理平台，是一個使用 "MERN" 來創建的**全端網頁項目**，旨在幫助個人和團隊可以更高效地管理其項目和任務。
使用 "Tipro" 你可以輕鬆的創建新專案、添加任務、分配團隊成員並通過直觀的時間表追蹤每個專案的時間。

### 專案功能

- dashboard 頁面，可以清楚呈現當日任務以及正在執行的專案，並可以在新的一天添加新的 memo
- project 頁面，呈現目前執行中的各個專案，並且可以創建、編輯以及刪除專案
- singleProject 頁面，呈現單一專案的詳細資訊，包含任務、各階段時間、聯絡資訊等等
- task 頁面，呈現完成與未完成的任務，並且可以創建、編輯、刪除任務
- time manage 頁面，呈現每項任務每週所花費的時間，以及各階段所花費的時間
- memos 頁面，呈現目前所記錄的 memos
- staffs 頁面，呈現相同 company Id 中的所有員工資訊
- setting 頁面，呈現使用者資訊，並且可以編輯個人資訊，包含大頭照

### 專案介紹

##### 主畫面
進入主畫面，會有一段自動播放的 APP 介紹影片，預設為靜音，可以自行操作聲音開關。
主畫面中會有登入及註冊按鈕，提供使用者依據需求選擇。
![home](https://user-images.githubusercontent.com/100119316/229409944-2b17461d-21e1-4abc-bd20-24ff61794887.gif)

##### 登入/註冊頁面

##### dashboard 頁面

##### project 頁面

##### tasks 頁面

##### time manager 頁面

##### memo 頁面

##### staffs 頁面

##### setting

***

### 專案使用相關套件

##### 前端(client side)

- React：進行前端用戶界面建構(處理 UI)
- React-query：管理 data 加載、更新狀態與發出 fetch 請求
- React-redux：管理 state，使在 react 中可以更有效的取用狀態資料
- redux-toolkit：用於簡化使用 redux 的開發流程，增加效率
- React-multi-select-component：主要使用於創建多重下拉式選單
- yup：進行前端表單驗證，並且可以回傳 error message
- React-hook-form：進行前端表單驗證
- sass：建構整體專案的 style、layout

##### 後端(server side)

- Node.js：執行後端 javascript 語言的環境
- MongoDB：本專案使用 NoSQL 的數據資料庫，並利用 json 格式存儲數據
- mongoose：使用 Model & Schema 的方式來創建 MongoDb 的數據資料庫
- Express：可以在 node.js 中創建路由系統、管理靜態資源
- dotenv：載入 .env 檔案中的環境變數到 Node.js 的 process.env 中，並且能夠讓應用程式在不同的環境中運行時使用不同的環境變數（確保機密資料的安全性）
- bcrypt：將密碼加密，提高密碼安全性
- jsonwebtoken：產生 json web token, 用以進行身份驗證，將 JWT 包含在 Authorization header 中
- multer：處理大頭照或文件的上傳，記得使用 "content-type": "multipart/form-data",
- xss-clean：過濾 html 防止網站被惡意攻擊
