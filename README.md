# Tipro

前端練習的 final project 
從LOGO設計，到UIUX，再到前端與後端的程式撰寫。

**[Tipro](https://tipro-app.onrender.com)** 是一個全端網頁 APP，請點擊連結前往測試網站！

### 目錄

- [專案主旨](#專案主旨)
- [專案功能](#專案功能)
- [專案介紹](#專案介紹)
- [專案 RWD](#專案RWD)
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
進入主畫面時，會有一段自動播放的介紹影片，預設為靜音，可以自行操作聲音開關。
在導覽列有登入以及註冊按鈕，可提供使用者依據需求點擊。

![home](https://user-images.githubusercontent.com/100119316/229410881-ac34de53-d5f1-4b4a-a9c2-dda7ccd2be9f.gif)


##### 登入/註冊頁面
登入及註冊頁面設計有表單驗證功能，當使用者沒有提供相應的資訊時會呈現錯誤訊息。
在註冊時，有 CompanyId 需要填寫，此選項是選擇性的，如果有填寫，就會新增一個公司群，如果沒有填寫則會使用預設值 "Tipro"
如果使用者有相同的 CompanyId，則會被共同編列成為同一間公司的員工，希望未來可以有更符合公司需求的功能。

在登入頁面，使用 JWT 來作為登入的驗證機制，並搭配 bcrypt 以確保使用者的帳號密碼是符合的。

![login_register](https://user-images.githubusercontent.com/100119316/229411194-40dba759-eaf8-453a-bb04-efcc3416d6bc.gif)


##### dashboard 頁面
當使用者登入成功後，畫面會跳轉至 dashboard 頁面，在 dashboard 會呈現三個資訊，分別是正在進行中的專案、今日的任務、今日的memo
上方導覽列有顯示當前時間，也可以修改夜間與日間模式，並且有搜尋功能可提供尋找相關的專案。
側邊欄可以導覽至相關的頁面，並設有登出鈕。

![dashboard](https://user-images.githubusercontent.com/100119316/229425412-3b9832b6-132f-42b6-9f7b-0cb6718fa4e6.gif)



##### project 頁面
- 全部 project 頁面:

當使用者進入 proejct 頁面時，會呈現所有的專案，上方標籤列根據專案進度做分類，讓使用者可以更直觀地看見專案。
在 project 頁面中，可以透過上方導覽列來添加新的專案。表單設有驗證機制，讓使用者將專案資訊填入。

![project](https://user-images.githubusercontent.com/100119316/229425441-26da4fb3-d36e-4825-93c0-494a9188d39b.gif)


- 單一 project 頁面:

使用者可以根據專案來進入單一專案頁面，這裡會顯示更詳盡的專案資訊，包含進程、員工、聯絡資訊、任務、花費時間，
在本頁面也可以容易的增刪改查專案的資訊。

![single project](https://user-images.githubusercontent.com/100119316/229425461-1926d1f6-aaa6-4d1e-bb49-6b3c55351ce6.gif)

##### tasks 頁面
使用者可以在除了 project 頁面以外的頁面，進行添加 task，你可以輸入 task 的起始時間，並且為其添加標籤。
在本頁面你可以透過按鈕來更改任務的完成狀態，並且可以輕鬆的修改任務的資訊。

![task](https://user-images.githubusercontent.com/100119316/229426114-3e966bb1-e574-4498-a7c0-b15db4cb3c29.gif)

##### time manager 頁面
你可以在此頁面透過**renew**按鈕，來更新目前的 timesheet，並且可以透過修改按鈕來修正工作的時間。
下方可以看見每一個專案各階段所花費的時間。

![time manager](https://user-images.githubusercontent.com/100119316/229426551-5033c040-70c2-4bd9-b325-82da6da63cc9.gif)

##### memo 頁面
在本頁面可以看見過去添加的 memo

![memo](https://user-images.githubusercontent.com/100119316/229426951-185f72fb-a230-4742-9246-0247d68f7747.gif)

##### staffs 頁面
你可以看見公司中的每一位員工

![staffs](https://user-images.githubusercontent.com/100119316/229427878-0f381e4d-28d6-496b-a86a-b2ea10ea0bfa.gif)


##### setting
你可以在個人資訊頁面進行設定大頭照、相關資訊的修改與編輯

![setting](https://user-images.githubusercontent.com/100119316/229428058-0d4a7098-29de-444d-a2f2-a52a15f7a2fc.gif)


### 專案RWD
本專案是一個使用者響應設計的專案，希望可以符合大眾市場中產品的各個尺寸，以提升使用者的使用感受

![RWD](https://user-images.githubusercontent.com/100119316/229429664-7b5f90d3-6b7b-4b1a-94ba-c95b5717a0d6.gif)

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
