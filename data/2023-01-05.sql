
--說明
SELECT * FROM products JOIN categories;   --共230筆(join->相乘, product:23, categories:10)
SELECT COUNT(1) FROM products JOIN categories;    

--使用一般join ，資料表的順序不影響
--INNER JOIN
SELECT * FROM products JOIN   --products & categories 資料表合併
  categories ON `products`.`category_sid` = categories.sid;
               --`products`.`category_sid` 要等於 categories.sid  
               --資料對不到，資料不會出現
SELECT * FROM categories JOIN  
   products ON `products`.`category_sid` = categories.sid;


SELECT p.*, c.name cate_name FROM products p JOIN  
  categories c ON p.`category_sid` = c.sid;


--LEFT OUTER JOIN 注意順序
--LEFT JOIN 代表LEFT JOIN 左邊的資料表一定要出現
SELECT p.*, c.name cate_name FROM products p LEFT JOIN  
  categories c ON p.`category_sid` = c.sid;


SELECT *  FROM  categories c LEFT JOIN  
   products p ON p.`category_sid` = c.sid;


SELECT od.*, p.bookname FROM order_details od 
    JOIN products p ON od.products_sid = p.sid 
    WHERE od.order_sid = 11;

--某個會員買過的所有商品
SELECT * FROM orders o
  JOIN order_details od ON o.sid =od.order_sid
  JOIN products p  ON od.product_sid =p.sid
  WHERE o.member_sid = 1 GROUP BY p.sid;


