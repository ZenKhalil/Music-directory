-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: music_db
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `albums`
--

DROP TABLE IF EXISTS `albums`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `albums` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `release_date` date DEFAULT NULL,
  `artist_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `artist_id` (`artist_id`),
  CONSTRAINT `albums_ibfk_1` FOREIGN KEY (`artist_id`) REFERENCES `artists` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=116 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `albums`
--

LOCK TABLES `albums` WRITE;
/*!40000 ALTER TABLE `albums` DISABLE KEYS */;
INSERT INTO `albums` VALUES (15,'+ (Plus)','2011-09-09',1),(16,'x (Multiply)','2014-06-23',1),(17,'÷ (Divide)','2017-03-03',1),(18,'When We All Fall Asleep, Where Do We Go?','2019-03-29',2),(19,'Happier Than Ever','2021-07-30',2),(20,'Fearless','2008-11-11',3),(21,'1989','2014-10-27',3),(22,'Reputation','2017-11-10',3),(23,'My Everything','2014-08-25',4),(24,'Thank U, Next','2019-02-08',4),(25,'Positions','2020-10-30',4),(26,'Stoney','2016-12-09',5),(27,'Beerbongs & Bentleys','2018-04-27',5),(28,'Hollywoods Bleeding','2019-09-06',5),(29,'Love Yourself: Tear','2018-05-18',6),(30,'Map of the Soul: 7','2020-02-21',6),(31,'Butter','2021-05-21',6),(32,'Dua Lipa','2017-06-02',7),(33,'Future Nostalgia','2020-03-27',7),(34,'Club Future Nostalgia','2020-08-21',7),(35,'Views','2016-04-29',8),(36,'Scorpion','2018-06-29',8),(37,'Certified Lover Boy','2021-09-03',8),(38,'Starboy','2016-11-25',9),(39,'After Hours','2020-03-20',9),(40,'Dawn FM','2022-01-07',9),(41,'Harry Styles','2017-05-12',10),(42,'Fine Line','2019-12-13',10),(43,'Cuz I Love You','2019-04-19',11),(44,'Lizzobangers','2013-10-15',11),(45,'Handwritten','2015-04-14',12),(46,'Illuminate','2016-09-23',12),(47,'Shawn Mendes','2018-05-25',12),(48,'Invasion of Privacy','2018-04-06',13),(49,'WAP','2020-08-07',13),(50,'Badlands','2015-08-28',14),(51,'Hopeless Fountain Kingdom','2017-06-02',14),(52,'Manic','2020-01-17',14),(53,'American Teen','2017-03-03',15),(54,'Free Spirit','2019-04-05',15),(55,'Camila','2018-01-12',16),(56,'Romance','2019-12-06',16),(57,'Doo-Wops & Hooligans','2010-10-04',17),(58,'24K Magic','2016-11-18',17),(59,'Stars Dance','2013-07-19',18),(60,'Rare','2020-01-10',18),(61,'The Fame','2008-08-19',19),(62,'Chromatica','2020-05-29',19),(63,'My World 2.0','2010-03-19',20),(64,'Changes','2020-02-14',20);
/*!40000 ALTER TABLE `albums` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `artists`
--

DROP TABLE IF EXISTS `artists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `artists` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `biography` text,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `genres` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artists`
--

LOCK TABLES `artists` WRITE;
/*!40000 ALTER TABLE `artists` DISABLE KEYS */;
INSERT INTO `artists` VALUES (1,'Ed Sheeran','En engelsk sanger-sangskriver og producer. Kendt for sin akustiske popmusik.','2023-09-13 21:20:42','2023-09-23 08:16:05','Folk'),(2,'Billie Eilish','Amerikansk pop sensation kendt for hendes unikke stemme og moderne lyd.','2023-09-13 21:20:42','2023-09-23 08:16:05','Electropop, Indie'),(3,'Taylor Swift','En af de mest succesrige country-turned-pop stjerner, kendt for hendes sangskrivnings evner.','2023-09-13 21:20:42','2023-09-23 08:16:05','Country'),(4,'Ariana Grande','Pop og R&B sanger kendt for hendes kraftfulde vokal.','2023-09-13 21:20:42','2023-09-23 08:16:05','R&B'),(5,'Post Malone','En amerikansk rapper, sanger og sangskriver. Kendt for sin blanding af hip hop og pop.','2023-09-13 21:20:42','2023-09-23 08:16:05','Hip-Hop'),(6,'BTS','Sydkoreansk boyband, der er blevet en global sensation.','2023-09-13 21:20:42','2023-09-23 08:16:05','K-Pop'),(7,'Dua Lipa','Engelsk pop og disco sanger med flere hits i de seneste år.','2023-09-13 21:20:42','2023-09-23 08:16:05','Disco'),(8,'Drake','Canadisk rapper, sanger og sangskriver med utallige hits i et årti.','2023-09-13 21:20:42','2023-09-23 08:16:05','Rap'),(9,'Weeknd','Canadisk sanger kendt for sin unikke R&B og pop stil.','2023-09-13 21:20:42','2023-09-23 08:16:05','R&B, Soul'),(10,'Harry Styles','Engelsk sanger og tidligere medlem af One Direction, nu har en succesrig solo karriere.','2023-09-13 21:20:42','2023-09-23 08:16:05','Rock'),(11,'Lizzo','Amerikansk sanger og rapper kendt for hendes upbeat musik og positive beskeder.','2023-09-13 21:20:42','2023-09-23 08:16:05','Hip-Hop'),(12,'Shawn Mendes','Canadisk sanger og sangskriver med en række pop hits.','2023-09-13 21:20:42','2023-09-23 08:16:05','Soft Rock'),(13,'Cardi B','Amerikansk rapper og tidligere reality TV-stjerne med en række hits i hip hop scenen.','2023-09-13 21:20:42','2023-09-23 08:16:05','Rap'),(14,'Halsey','Amerikansk sanger og sangskriver kendt for hendes pop og alternativ musik.','2023-09-13 21:20:42','2023-09-23 08:16:05','Alternative, Pop'),(15,'Khalid','Amerikansk sanger kendt for hans R&B hits og unikke vokal.','2023-09-13 21:20:42','2023-09-23 08:16:05','Soul, R&B'),(16,'Camila Cabello','Cubansk-amerikansk sanger, tidligere medlem af Fifth Harmony, nu soloartist.','2023-09-13 21:20:42','2023-09-23 08:16:05','Latin, Pop'),(17,'Bruno Mars','Amerikansk sanger, sangskriver og producer kendt for sin alsidige stil i pop og R&B','2023-09-13 21:20:42','2023-09-25 15:54:09','Funk, R&B'),(18,'Selena Gomez','Amerikansk sanger og skuespillerinde, tidligere Disney-stjerne, nu pop sensation.','2023-09-13 21:20:42','2023-09-23 08:16:05','Electropop'),(19,'Lady Gaga','Amerikansk sanger, sangskriver og skuespillerinde kendt for hendes kraftfulde vokal og teatralske optrædener.','2023-09-13 21:20:42','2023-09-23 08:16:05','Dance, Pop'),(20,'Justin Bieber','Canadisk pop sanger, der startede sin karriere som en teenager sensation.','2023-09-13 21:20:42','2023-09-23 08:16:05','Contemporary R&B, Pop');
/*!40000 ALTER TABLE `artists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sequelizemeta`
--

LOCK TABLES `sequelizemeta` WRITE;
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tracks`
--

DROP TABLE IF EXISTS `tracks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tracks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `duration` varchar(10) DEFAULT NULL,
  `album_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `track_ibfk_1` (`album_id`),
  CONSTRAINT `tracks_ibfk_1` FOREIGN KEY (`album_id`) REFERENCES `albums` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=301 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tracks`
--

LOCK TABLES `tracks` WRITE;
/*!40000 ALTER TABLE `tracks` DISABLE KEYS */;
INSERT INTO `tracks` VALUES (29,'The A Team','04:18',15),(30,'Lego House','03:05',15),(31,'Sing','03:55',15),(32,'Photograph','04:19',17),(33,'Shape of You','03:53',16),(34,'Bad Guy','03:14',18),(35,'Ocean Eyes','03:20',18),(36,'Bury a Friend','03:13',18),(37,'Therefore I Am','02:54',19),(38,'Love Story','03:56',20),(39,'Blank Space','03:51',20),(40,'Delicate','03:52',20),(41,'Shake It Off','03:39',22),(42,'Look What You Made Me Do','03:31',21),(43,'Problem','03:13',23),(44,'7 Rings','02:59',23),(45,'Positions','02:52',23),(46,'34+35','02:53',25),(47,'Thank U, Next','03:27',24),(48,'White Iverson','04:15',26),(49,'Rockstar','03:38',26),(50,'Circles','03:34',26),(51,'Sunflower','02:38',28),(52,'Goodbyes','02:56',27),(53,'Fake Love','04:01',29),(54,'Blood Sweat & Tears','03:36',29),(55,'Dynamite','03:19',29),(56,'Butter','02:45',31),(57,'Permission to Dance','03:08',30),(58,'New Rules','03:32',32),(59,'Dont Start Now','03:03',32),(60,'Levitating','03:23',32),(61,'Physical','03:13',34),(62,'Love Again','03:49',33),(63,'Hotline Bling','04:27',35),(64,'One Dance','02:54',35),(65,'In My Feelings','03:37',35),(66,'Gods Plan','03:18',37),(67,'Way 2 Sexy','02:25',36),(68,'Starboy','03:50',38),(69,'Blinding Lights','03:22',38),(70,'Save Your Tears','03:35',38),(71,'In the Night','03:55',40),(72,'Take My Breath','03:40',39),(73,'Sign of the Times','05:41',41),(74,'Watermelon Sugar','02:54',41),(75,'Adore You','03:27',41),(76,'Falling','04:00',43),(77,'Golden','02:29',42),(78,'Truth Hurts','02:53',43),(79,'Good as Hell','02:39',43),(80,'Juice','03:15',43),(81,'Batches & Cookies','02:35',43),(82,'Stitches','03:25',45),(83,'Treat You Better','03:06',45),(84,'In My Blood','03:31',45),(85,'Lost in Japan','03:21',46),(86,'Nervous','02:44',44),(87,'Bodak Yellow','03:44',48),(88,'I Like It','04:13',48),(89,'WAP','03:07',49),(90,'Up','02:36',47),(91,'Colors','04:09',50),(92,'Without Me','03:21',50),(93,'You Should Be Sad','03:25',50),(94,'Graveyard','03:02',52),(95,'Be Kind','02:54',51),(96,'Location','03:39',53),(97,'Young Dumb & Broke','03:22',53),(98,'Talk','03:17',56),(99,'Better','03:50',54),(100,'Havana','03:37',55),(101,'Never Be the Same','03:47',55),(102,'Señorita','03:11',60),(103,'Liar','03:28',58),(104,'Just the Way You Are','03:40',57),(105,'Grenade','03:42',57),(106,'24K Magic','03:45',57),(107,'Thats What I Like','03:26',62),(108,'Come & Get It','03:51',59),(109,'Good for You','03:41',59),(110,'Lose You to Love Me','03:27',59),(111,'Rare','03:40',64),(112,'Poker Face','03:57',61),(113,'Bad Romance','04:54',61),(114,'Rain On Me','03:02',61),(115,'Stupid Love','03:13',61),(116,'Baby','03:36',63),(117,'Sorry','03:20',63),(118,'Intentions','03:33',63),(119,'Yummy','03:30',63),(211,'Moonlight Serenade','04:02',16),(212,'Starry Night','03:45',16),(213,'Galactic Dreams','03:58',16),(214,'Sunrise Melody','03:50',17),(215,'Golden Horizon','04:05',17),(216,'Daybreak Dance','03:55',17),(217,'Ocean Waves','04:10',19),(218,'Sandy Shores','03:40',19),(219,'Tidal Rhythms','03:30',19),(220,'Forest Whispers','04:15',21),(221,'Natures Call','03:35',21),(222,'Woodland Echoes','03:25',21),(223,'Urban Pulse','04:20',22),(224,'City Nights','03:45',22),(225,'Metropolitan Vibes','03:55',22),(226,'Epic Finale','04:00',62),(227,'Climactic Moments','03:50',62),(228,'Grand Exit','03:40',62),(229,'Final Encore','04:10',64),(230,'Last Bow','03:40',64),(231,'Curtain Call','03:30',64),(232,'Desert Mirage','04:15',24),(233,'Sands of Time','03:50',24),(234,'Oasis Dreams','03:45',24),(235,'Mountain Peak','04:10',25),(236,'Valley Echo','03:40',25),(237,'Rocky Trails','03:55',25),(238,'Jungle Beat','04:05',27),(239,'Rainforest Rhythm','03:35',27),(240,'Tropical Tune','03:30',27),(241,'Island Breeze','04:20',28),(242,'Beach Vibes','03:45',28),(243,'Coastal Waves','03:50',28),(244,'Stellar Journey','04:00',58),(245,'Galaxy Groove','03:50',58),(246,'Cosmic Dance','03:40',58),(247,'Final Note','04:10',60),(248,'Last Melody','03:40',60),(249,'End Credits','03:30',60),(250,'City Lights','04:12',30),(251,'Urban Pulse','03:58',30),(252,'Metro Rhythms','03:46',30),(253,'Frozen Heart','04:09',31),(254,'Snowfall Serenade','03:52',31),(255,'Icy Echoes','03:47',31),(256,'River Flow','04:05',33),(257,'Natures Whisper','03:55',33),(258,'Forest Melody','03:50',33),(259,'Golden Fields','04:10',34),(260,'Harvest Hymn','03:53',34),(261,'Sunny Skies','03:48',34),(262,'Moonlit Sonata','04:07',36),(263,'Starry Serenade','03:57',36),(264,'Nights Lullaby','03:45',36),(265,'Oceans Call','04:15',37),(266,'Wave Waltz','03:59',37),(267,'Tidal Tunes','03:44',37),(268,'Windswept Wonders','04:12',39),(269,'Breezy Ballad','03:56',39),(270,'Gusts and Melodies','03:49',39),(271,'Mystic Mountains','04:08',40),(272,'Peak Performance','03:54',40),(273,'Elevated Echoes','03:46',40),(274,'Deserted Dunes','04:11',42),(275,'Sahara Sounds','03:57',42),(276,'Oasis Overture','03:43',42),(277,'Jungle Jams','04:13',44),(278,'Rainforest Resonance','03:58',44),(279,'Tropical Tones','03:45',44),(280,'Island Inspirations','04:14',46),(281,'Beach Beats','03:59',46),(282,'Coastal Chords','03:44',46),(283,'Stellar Sounds','04:10',47),(284,'Galactic Grooves','03:55',47),(285,'Cosmic Compositions','03:42',47),(286,'River Reflections','04:09',49),(287,'Natures Notes','03:53',49),(288,'Forest Frequencies','03:41',49),(289,'Golden Grooves','04:07',51),(290,'Harvest Harmonies','03:52',51),(291,'Sunny Songs','03:40',51),(292,'Moonlit Melodies','04:06',52),(293,'Starry Sounds','03:51',52),(294,'Nights Notes','03:39',52),(295,'Oceans Orchestra','04:05',54),(296,'Wave Waltzes','03:50',54),(297,'Tidal Tunes','03:38',54),(298,'Windswept Waves','04:04',56),(299,'Breezy Ballads','03:49',56),(300,'Gusts and Grooves','03:37',56);
/*!40000 ALTER TABLE `tracks` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-25 22:43:55
