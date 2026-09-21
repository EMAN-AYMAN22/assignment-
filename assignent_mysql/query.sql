
/*Q5_Create API endpoints to perform the following database modifications: (2 Grade) 
● Add a Category column to the Products table. 
● Remove the Category column. 
● Change ContactNumber to VARCHAR(15). 
● Add a NOT NULL constraint to ProductName*/

ALTER TABLE products ADD Category VARCHAR(255) NULL;
ALTER TABLE products DROP COLUMN Category;
ALTER TABLE suppliers MODIFY contact_number VARCHAR(15);
ALTER TABLE products MODIFY name VARCHAR(255) NOT NULL;

-------------------------------------------------------------------------------


/*
6. Create an API endpoint or initialization script to insert the following data:( 1.5 Grade)  
 a. Add a supplier with the name 'FreshFoods' and contact number '01001234567'. 
 b. Insert the following three products, all provided by 'FreshFoods': 
   i.'Milk' with a price of 15.00 and stock quantity of 50. 
   ii. 'Bread' with a price of 10.00 and stock quantity of 30. 
   iii. 'Eggs' with a price of 20.00 and stock quantity of 40. 
 c. Add a record for the sale of 2 units of 'Milk' made on '2025-05-20'.
 */

INSERT INTO suppliers (name,contact_number) VALUES('FreshFoods', '01001234567')
INSERT INTO products (name,price,stock_quantity,supplier_id) VALUES('Milk',15.00,50,18),( 'Bread' ,10.00,30,18),('Eggs',20.00,40,18)
INSERT INTO sales( 'date', 'quantity_sold', 'product_id') VALUES ('2025-05-20',2,13);

------------------------------------------------------------------------------------------------

/* Create an API endpoint to update the price of 'Bread' to 25.00*/

UPDATE products SET price=25.00 WHERE id=17;

------------------------------------------------------------------------------------------------

/*8.Create an API endpoint to delete the product 'Eggs'*/

DELETE FROM products WHERE id=18

------------------------------------------------------------------------------------------------

/*9. Create a reporting endpoint to retrieve the total quantity sold for each product using SQL aggregate functions*/

SELECT product_id, SUM(quantity_sold) AS total_sold FROM sales GROUP BY product_id;
------------------------------------------------------------------------------------------------

/*10. Create a reporting endpoint to retrieve the product with the highest stock quantity.*/

SELECT MAX(stock_quantity) FROM products;

-----------------------------------------------------------------------------------------------

/*11. Create a reporting endpoint to retrieve suppliers whose names start with 'F'.*/

SELECT * FROM suppliers WHERE name LIKE "F%"

----------------------------------------------------------------------------------------------

/*12. Create a reporting endpoint to retrieve all products that have never been sold. (0.5 Grade)  */

SELECT * FROM products LEFT JOIN sales ON products.id = sales.product_id
WHERE sales.product_id IS NULL;

-----------------------------------------------------------------------------------------------

/*13. Create a reporting endpoint to retrieve all sales including: (0.5 Grade)  
● Product name 
● Quantity sold 
● Sale date using SQL JOIN operations.*/

SELECT 
products.name AS product_name,sales.quantity_sold,sales.date AS sale_date
FROM sales
JOIN products ON products.id = sales.product_id;

------------------------------------------------------------------------------------------------

/*14. Create a SQL script or secure administrative endpoint to create a MySQL user named store_manager and grant the 
following permissions on all tables: (0.5 Grade)  
● SELECT 
● INSERT 
● UPDATE  */

-- 1. إنشاء المستخدم مع كلمة مرور معينة
CREATE USER 'store_manager'@'localhost' IDENTIFIED BY 'ManagerPassword123!';

-- 2. منح الصلاحيات المطلوبة على جميع جداول قاعدة البيانات shop_app
GRANT SELECT, INSERT, UPDATE ON shop_app.* TO 'store_manager'@'localhost';

-- 3. تحديث جدول الصلاحيات لتطبيق التغييرات فوراً
FLUSH PRIVILEGES;
--مكنتش اعرف ده و كنت بعمله من الداتا بيز من غيركود 

---------------------------------------------------------------------------------------------------

/*15. Revoke the UPDATE permission from “store_manager”*/

-- 1. سحب صلاحية UPDATE من المستخدم على قاعدة البيانات shop_app
REVOKE UPDATE ON shop_app.* FROM 'store_manager'@'localhost';

-- 2. تحديث جدول الصلاحيات لتطبيق التغييرات فوراً
FLUSH PRIVILEGES;

----------------------------------------------------------------------------------------------------

/* Grant DELETE permission to “store_manager” only on the Sales table*/

-- 1. منح صلاحية DELETE على جدول sales فقط داخل قاعدة البيانات shop_app
GRANT DELETE ON shop_app.sales TO 'store_manager'@'localhost';

-- 2. تحديث جدول الصلاحيات لتطبيق التغييرات فوراً
FLUSH PRIVILEGES;