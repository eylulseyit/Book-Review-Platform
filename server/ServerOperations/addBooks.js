const Book = require('../models/Book'); // Book modelini içeri aktarın
const sequelize = require('../config/database'); // Sequelize instance'ı içeri aktarın
const books = [
    { title: 'The Catcher in the Rye', author: 'J.D. Salinger', genre: 'Fiction', isbn: '9780316769488', description: 'A story about teenage rebellion and angst.' },
    { title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Fiction', isbn: '9780061120084', description: 'A novel about racial injustice in the Deep South.' },
    { title: '1984', author: 'George Orwell', genre: 'Dystopian', isbn: '9780451524935', description: 'A dystopian novel about totalitarian regime and surveillance.' },
    { title: 'Pride and Prejudice', author: 'Jane Austen', genre: 'Romance', isbn: '9781503290563', description: 'A classic novel about manners and matrimonial machinations.' },
    { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Fiction', isbn: '9780743273565', description: 'A critique of the American Dream set in the 1920s.' },
    { title: 'Moby Dick', author: 'Herman Melville', genre: 'Adventure', isbn: '9781503280786', description: 'The epic tale of a sea captain\'s obsession with a white whale.' },
    { title: 'War and Peace', author: 'Leo Tolstoy', genre: 'Historical Fiction', isbn: '9780199232765', description: 'A novel that chronicles the French invasion of Russia.' },
    { title: 'The Odyssey', author: 'Homer', genre: 'Epic', isbn: '9780140268867', description: 'An epic poem about the journey of Odysseus.' },
    { title: 'Crime and Punishment', author: 'Fyodor Dostoevsky', genre: 'Philosophical Fiction', isbn: '9780140449136', description: 'A novel about the mental anguish of a young man.' },
    { title: 'The Brothers Karamazov', author: 'Fyodor Dostoevsky', genre: 'Philosophical Fiction', isbn: '9780374528379', description: 'A story about patricide and family rivalry.' },
    { title: 'Brave New World', author: 'Aldous Huxley', genre: 'Dystopian', isbn: '9780060850524', description: 'A novel about a futuristic World State.' },
    { title: 'Jane Eyre', author: 'Charlotte Brontë', genre: 'Romance', isbn: '9780141441146', description: 'A novel about the experiences of Jane Eyre.' },
    { title: 'Wuthering Heights', author: 'Emily Brontë', genre: 'Gothic Fiction', isbn: '9780141439556', description: 'A tale of passion and revenge on the Yorkshire moors.' },
    { title: 'The Divine Comedy', author: 'Dante Alighieri', genre: 'Epic Poetry', isbn: '9780140448955', description: 'An epic poem describing the journey through the afterlife.' },
    { title: 'The Hobbit', author: 'J.R.R. Tolkien', genre: 'Fantasy', isbn: '9780547928227', description: 'A fantasy novel about the journey of Bilbo Baggins.' },
    { title: 'Fahrenheit 451', author: 'Ray Bradbury', genre: 'Dystopian', isbn: '9781451673319', description: 'A novel about a future where books are banned.' },
    { title: 'The Picture of Dorian Gray', author: 'Oscar Wilde', genre: 'Philosophical Fiction', isbn: '9780141439570', description: 'A story about a man who remains young while his portrait ages.' },
    { title: 'Anna Karenina', author: 'Leo Tolstoy', genre: 'Realist Novel', isbn: '9780143035008', description: 'A novel about a tragic adulterous affair.' },
    { title: 'The Grapes of Wrath', author: 'John Steinbeck', genre: 'Realist Novel', isbn: '9780143039433', description: 'A story about the hardships of an American family during the Great Depression.' },
    { title: 'The Lord of the Rings', author: 'J.R.R. Tolkien', genre: 'Fantasy', isbn: '9780544003415', description: 'An epic fantasy novel about the quest to destroy the One Ring.' },
    { title: 'The Kite Runner', author: 'Khaled Hosseini', genre: 'Historical Fiction', isbn: '9781594631931', description: 'A story about friendship and redemption in Afghanistan.' },
    { title: 'One Hundred Years of Solitude', author: 'Gabriel García Márquez', genre: 'Magic Realism', isbn: '9780060883287', description: 'A novel chronicling the Buendía family over generations.' },
    { title: 'The Alchemist', author: 'Paulo Coelho', genre: 'Adventure', isbn: '9780061122415', description: 'A novel about a shepherd\'s journey to find treasure.' },
    { title: 'Catch-22', author: 'Joseph Heller', genre: 'Satire', isbn: '9781451626650', description: 'A satirical novel about World War II.' },
    { title: 'Slaughterhouse-Five', author: 'Kurt Vonnegut', genre: 'Science Fiction', isbn: '9780440180296', description: 'A novel about the World War II experiences of Billy Pilgrim.' },
    { title: 'The Road', author: 'Cormac McCarthy', genre: 'Post-Apocalyptic', isbn: '9780307387899', description: 'A novel about a father and son journeying through a desolate America.' },
    { title: 'Life of Pi', author: 'Yann Martel', genre: 'Adventure', isbn: '9780156027328', description: 'A story about a boy stranded on a lifeboat with a Bengal tiger.' },
    { title: 'The Book Thief', author: 'Markus Zusak', genre: 'Historical Fiction', isbn: '9780375842206', description: 'A novel about a young girl in Nazi Germany who steals books.' },
    { title: 'The Chronicles of Narnia', author: 'C.S. Lewis', genre: 'Fantasy', isbn: '9780066238500', description: 'A series of fantasy novels about the adventures in the land of Narnia.' },
    { title: 'The Stranger', author: 'Albert Camus', genre: 'Philosophical Fiction', isbn: '9780679720201', description: 'A novel about the absurdity of life and the human condition.' },
    { title: 'The Trial', author: 'Franz Kafka', genre: 'Dystopian', isbn: '9780805209990', description: 'A story of a man who is arrested without being told why.' },
    { title: 'The Master and Margarita', author: 'Mikhail Bulgakov', genre: 'Fantasy', isbn: '9780141185989', description: 'A tale about the devil visiting Soviet Moscow.' },
    { title: 'Don Quixote', author: 'Miguel de Cervantes', genre: 'Novel', isbn: '9780060934347', description: 'A story of a man who believes he is a knight and goes on adventures.' },
    { title: 'Les Misérables', author: 'Victor Hugo', genre: 'Historical Fiction', isbn: '9780451419439', description: 'A tale of love, justice, and redemption in post-revolutionary France.' },
    { title: 'Frankenstein', author: 'Mary Shelley', genre: 'Horror', isbn: '9780141439471', description: 'A story of a scientist who creates a monster.' },
    { title: 'Siddhartha', author: 'Hermann Hesse', genre: 'Philosophical Fiction', isbn: '9780553208849', description: 'A novel about a young man’s spiritual journey.' },
    { title: 'The Catcher in the Rye', author: 'J.D. Salinger', genre: 'Fiction', isbn: '9780316769488', description: 'A story about teenage rebellion and angst.' },
    { title: 'The Subtle Art of Not Giving a F*ck', author: 'Mark Manson', genre: 'Self-help', isbn: '9780062457714', description: 'A guide to living a good life by embracing struggle.' },
    { title: 'The Power of Habit', author: 'Charles Duhigg', genre: 'Self-help', isbn: '9780812981605', description: 'A book about how habits are formed and how they can be changed.' },
    { title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', genre: 'Psychology', isbn: '9780374533557', description: 'A book about the two systems that drive the way we think.' },
    { title: 'Atomic Habits', author: 'James Clear', genre: 'Self-help', isbn: '9780735211292', description: 'A guide on how to form good habits and break bad ones.' },
    { title: 'The 7 Habits of Highly Effective People', author: 'Stephen Covey', genre: 'Self-help', isbn: '9780743269513', description: 'A classic guide to achieving personal and professional success.' },
    { title: 'Educated', author: 'Tara Westover', genre: 'Memoir', isbn: '9780399590504', description: 'A memoir about a girl who grows up in a survivalist family.' },
    { title: 'Becoming', author: 'Michelle Obama', genre: 'Memoir', isbn: '9781524763138', description: 'A memoir by the former First Lady of the United States.' },
    { title: 'The Four Agreements', author: 'Don Miguel Ruiz', genre: 'Self-help', isbn: '9781878424310', description: 'A book about four principles for achieving personal freedom.' }
  ];
  

const createBooks = async () => {
  try {
    // Veritabanına bağlan ve şemaları senkronize et
    await sequelize.authenticate();
    await sequelize.sync(); // Şemaları oluşturur
    console.log('Database connection has been established successfully.');

    // Kitapları ekle
    for (const book of books) {
      try {
        const [createdBook, created] = await Book.findOrCreate({
          where: { isbn: book.isbn }, // ISBN ile kontrol ederek tekrar eklemeyi engeller
          defaults: {
            title: book.title,
            author: book.author,
            genre: book.genre,
            isbn: book.isbn,
            description: book.description,
          }
        });
        
        if (created) {
          console.log("created successfully.");
        } else {
          console.log(  "already exists.");
        }
      } catch (error) {
        console.error( "ERROR");
      }
    }

    console.log('All books have been processed.');
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
  } finally {
    // Bağlantıyı kapat
    await sequelize.close();
    console.log('Database connection closed.');
  }
};

// Kitapları oluşturmayı başlat
createBooks();