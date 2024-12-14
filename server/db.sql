-- Creating the database
CREATE DATABASE IF NOT EXISTS book_site;
USE book_site;

-- Creating the user table
CREATE TABLE IF NOT EXISTS user (
    user_ID INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hashed VARCHAR(255) NOT NULL,
    bio TEXT
);

-- Creating the book table
CREATE TABLE IF NOT EXISTS book (
    book_ID INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    genre VARCHAR(100),
    isbn VARCHAR(13),
    description TEXT
);

-- Creating the review table
CREATE TABLE IF NOT EXISTS review (
    review_ID INT AUTO_INCREMENT PRIMARY KEY,
    user_ID INT NOT NULL,
    book_ID INT NOT NULL,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    review_text TEXT,
    review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_ID) REFERENCES user(user_ID) ON DELETE CASCADE,
    FOREIGN KEY (book_ID) REFERENCES book(book_ID) ON DELETE CASCADE
);

-- Creating the comment table
CREATE TABLE IF NOT EXISTS comment (
    comment_ID INT AUTO_INCREMENT PRIMARY KEY,
    user_ID INT NOT NULL,
    review_ID INT NOT NULL,
    comment_text TEXT NOT NULL,
    comment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_ID) REFERENCES user(user_ID) ON DELETE CASCADE,
    FOREIGN KEY (review_ID) REFERENCES review(review_ID) ON DELETE CASCADE
);

-- Creating the reading list table
CREATE TABLE IF NOT EXISTS reading_list (
    list_ID INT AUTO_INCREMENT PRIMARY KEY,
    user_ID INT NOT NULL,
    listname VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_ID) REFERENCES user(user_ID) ON DELETE CASCADE
);

-- Creating the book_in_list table
CREATE TABLE IF NOT EXISTS book_in_list (
    list_ID INT NOT NULL,
    book_ID INT NOT NULL,
    progress INT CHECK (progress BETWEEN 0 AND 100),
    added_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (list_ID, book_ID),
    FOREIGN KEY (list_ID) REFERENCES reading_list(list_ID) ON DELETE CASCADE,
    FOREIGN KEY (book_ID) REFERENCES book(book_ID) ON DELETE CASCADE
);

-- Creating the recommendation table
CREATE TABLE IF NOT EXISTS recommendation (
    recommendation_ID INT AUTO_INCREMENT PRIMARY KEY,
    user_ID INT NOT NULL,
    book_ID INT NOT NULL,
    recommendation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_ID) REFERENCES user(user_ID) ON DELETE CASCADE,
    FOREIGN KEY (book_ID) REFERENCES book(book_ID) ON DELETE CASCADE
);

-- Populate `user` table
INSERT INTO user (username, email, password_hashed, bio) VALUES
('user1', 'user1@example.com', 'hashedpassword1', 'Loves reading fantasy books'),
('user2', 'user2@example.com', 'hashedpassword2', 'Sci-fi enthusiast'),
('user3', 'user3@example.com', 'hashedpassword3', 'History buff and book lover'),
('user4', 'user4@example.com', 'hashedpassword4', 'Enjoys mystery novels'),
('user5', 'user5@example.com', 'hashedpassword5', 'Casual reader'),
('user6', 'user6@example.com', 'hashedpassword6', 'Book blogger'),
('user7', 'user7@example.com', 'hashedpassword7', 'Reads to explore new worlds'),
('user8', 'user8@example.com', 'hashedpassword8', 'Thriller fan'),
('user9', 'user9@example.com', 'hashedpassword9', 'Romance books are my thing'),
('user10', 'user10@example.com', 'hashedpassword10', 'Aspiring writer');

-- Populate `book` table
INSERT INTO book (title, author, genre, isbn, description) VALUES
('The Hobbit', 'J.R.R. Tolkien', 'Fantasy', '9780007525492', 'A hobbit goes on an epic journey.'),
('Dune', 'Frank Herbert', 'Science Fiction', '9780441013593', 'A young man becomes a leader on a desert planet.'),
('Sapiens', 'Yuval Noah Harari', 'Non-Fiction', '9780062316097', 'A brief history of humankind.'),
('1984', 'George Orwell', 'Dystopian', '9780451524935', 'A world ruled by Big Brother.'),
('The Catcher in the Rye', 'J.D. Salinger', 'Classic', '9780316769488', 'A story of teenage rebellion.'),
('Pride and Prejudice', 'Jane Austen', 'Romance', '9780141040349', 'A classic tale of love and misunderstanding.'),
('To Kill a Mockingbird', 'Harper Lee', 'Classic', '9780060935467', 'A story of race and injustice.'),
('The Shining', 'Stephen King', 'Horror', '9780385121675', 'A family in an isolated hotel faces supernatural forces.'),
('The Great Gatsby', 'F. Scott Fitzgerald', 'Classic', '9780743273565', 'A tragic love story set in the Jazz Age.'),
('Murder on the Orient Express', 'Agatha Christie', 'Mystery', '9780062073508', 'A murder mystery on a train.');

-- Populate `review` table
INSERT INTO review (user_ID, book_ID, rating, review_text) VALUES
(1, 1, 5, 'An absolute classic. Tolkien never fails to impress.'),
(2, 2, 4, 'Amazing world-building and political intrigue.'),
(3, 3, 5, 'A thought-provoking analysis of our species.'),
(4, 4, 5, 'A terrifying vision of the future.'),
(5, 5, 3, 'Interesting, but not my favorite.'),
(6, 6, 4, 'A charming and witty romance story.'),
(7, 7, 5, 'Deeply moving and powerful.'),
(8, 8, 4, 'Stephen King at his best!'),
(9, 9, 4, 'A poignant critique of the American Dream.'),
(10, 10, 5, 'An iconic mystery with an unforgettable twist.');

-- Populate `comment` table
INSERT INTO comment (user_ID, review_ID, comment_text) VALUES
(2, 1, 'I agree, Tolkien is a master storyteller.'),
(3, 2, 'Dune is definitely a masterpiece!'),
(4, 3, 'Sapiens changed how I view history.'),
(5, 4, '1984 feels more relevant than ever.'),
(6, 5, 'I found it relatable in some parts.'),
(7, 6, 'One of my favorite romances too!'),
(8, 7, 'Such an emotional read.'),
(9, 8, 'The Shining is so chilling!'),
(10, 9, 'Gatsby is timeless.'),
(1, 10, 'Agatha Christie is unmatched in mysteries.');

-- Populate `reading_list` table
INSERT INTO reading_list (user_ID, listname) VALUES
(1, 'Favorites'),
(2, 'Sci-Fi Reads'),
(3, 'Historical Non-Fiction'),
(4, 'Dystopian Novels'),
(5, 'Casual Reads'),
(6, 'Romantic Classics'),
(7, 'Emotional Stories'),
(8, 'Horror and Thrillers'),
(9, 'Timeless Tales'),
(10, 'Mystery Collection');

-- Populate `book_in_list` table
INSERT INTO book_in_list (list_ID, book_ID, progress) VALUES
(1, 1, 100),
(2, 2, 75),
(3, 3, 50),
(4, 4, 90),
(5, 5, 10),
(6, 6, 100),
(7, 7, 80),
(8, 8, 60),
(9, 9, 100),
(10, 10, 40);

-- Populate `recommendation` table
INSERT INTO recommendation (user_ID, book_ID) VALUES
(1, 2),
(2, 3),
(3, 4),
(4, 5),
(5, 6),
(6, 7),
(7, 8),
(8, 9),
(9, 10),
(10, 1);

SELECT * FROM book LIMIT 10;