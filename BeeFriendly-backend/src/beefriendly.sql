-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Mar 18, 2023 at 10:58 AM
-- Server version: 8.0.31
-- PHP Version: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `beefriendly`
--

-- --------------------------------------------------------

--
-- Table structure for table `acquire`
--

DROP TABLE IF EXISTS `acquire`;
CREATE TABLE IF NOT EXISTS `acquire` (
  `id_hive` int DEFAULT NULL,
  `id_beekeeper` varchar(50) DEFAULT NULL,
  `date_acquisition` date NOT NULL,
  KEY `id_hive` (`id_hive`),
  KEY `id_beekeeper` (`id_beekeeper`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `adv`
--

DROP TABLE IF EXISTS `adv`;
CREATE TABLE IF NOT EXISTS `adv` (
  `id_dv` int NOT NULL AUTO_INCREMENT,
  `comp_name` varchar(100) DEFAULT NULL,
  `adv_img_path` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id_dv`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `article`
--

DROP TABLE IF EXISTS `article`;
CREATE TABLE IF NOT EXISTS `article` (
  `id_article` int NOT NULL AUTO_INCREMENT,
  `content` varchar(1500) DEFAULT NULL,
  `title_article` varchar(100) DEFAULT NULL,
  `article_img_path` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id_article`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `beehive`
--

DROP TABLE IF EXISTS `beehive`;
CREATE TABLE IF NOT EXISTS `beehive` (
  `id_hive` int NOT NULL AUTO_INCREMENT,
  `desc_hive` varchar(50) NOT NULL,
  `location` varchar(50) NOT NULL,
  `date_listed` date NOT NULL,
  `state` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id_hive`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `beehive`
--

INSERT INTO `beehive` (`id_hive`, `desc_hive`, `location`, `date_listed`, `state`) VALUES
(1, 'description of a hive', 'locy, locx', '1981-12-11', NULL),
(2, 'description of a hive', 'locy, locx', '1981-12-11', 'health state determined by nouss work'),
(3, 'description of a hive grer', 'locy, locx', '0000-00-00', 'health state determined by nouss work'),
(4, 'description of a hive grerhtaqg', 'locy, locx', '0000-00-00', 'health state determined by nouss work'),
(5, 'description of hive', 'locy, locx', '0000-00-00', 'health state determined by nouss work'),
(6, 'description of hive', 'locy, locx', '2023-03-18', 'health state determined by nouss work'),
(7, 'description of hive', 'locy, locx', '2023-04-18', 'health state determined by nouss work'),
(8, 'description of hive', 'locy, locx', '2023-04-18', 'health state determined by nouss work'),
(9, 'description of hive', 'locy, locx', '2023-04-17', 'health state determined by nouss work');

-- --------------------------------------------------------

--
-- Table structure for table `beehive_img`
--

DROP TABLE IF EXISTS `beehive_img`;
CREATE TABLE IF NOT EXISTS `beehive_img` (
  `id_hive` int DEFAULT NULL,
  `id_hive_img` int NOT NULL AUTO_INCREMENT,
  `hive_img_path` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id_hive_img`),
  KEY `id_hive` (`id_hive`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `beehive_img`
--

INSERT INTO `beehive_img` (`id_hive`, `id_hive_img`, `hive_img_path`) VALUES
(NULL, 1, 'path/to/img'),
(NULL, 2, 'path/to/img3'),
(4, 3, 'path/to/img36'),
(5, 4, 'path/to/img36'),
(6, 5, 'path/to/img36'),
(7, 6, 'path/to/img39'),
(8, 7, 'path/to/img39'),
(9, 8, 'path/to/img39'),
(NULL, 9, NULL),
(NULL, 10, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `beekeeper`
--

DROP TABLE IF EXISTS `beekeeper`;
CREATE TABLE IF NOT EXISTS `beekeeper` (
  `id_beekeeper` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `first_name` varchar(70) NOT NULL,
  `last_name` varchar(70) NOT NULL,
  `adress` varchar(250) NOT NULL,
  PRIMARY KEY (`id_beekeeper`),
  UNIQUE KEY `username` (`username`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `beekeeper`
--

INSERT INTO `beekeeper` (`id_beekeeper`, `username`, `password`, `first_name`, `last_name`, `adress`) VALUES
('36a399ea-3320-48ad-9132-8b952fd26876', 'nouss', '$2b$10$XotBZi4RhKJ1uAP/2YvmoOsEpfE/zKiGSjPQxlUpL5M', 'noussa', 'bachiri', 'dwar chelghom');

-- --------------------------------------------------------

--
-- Table structure for table `calendar`
--

DROP TABLE IF EXISTS `calendar`;
CREATE TABLE IF NOT EXISTS `calendar` (
  `date_heure` date NOT NULL,
  PRIMARY KEY (`date_heure`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `package`
--

DROP TABLE IF EXISTS `package`;
CREATE TABLE IF NOT EXISTS `package` (
  `id_package` varchar(50) NOT NULL,
  `duration_month` int NOT NULL,
  `price_pkg` double NOT NULL,
  PRIMARY KEY (`id_package`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `purchase`
--

DROP TABLE IF EXISTS `purchase`;
CREATE TABLE IF NOT EXISTS `purchase` (
  `date_heure` date DEFAULT NULL,
  `id_package` varchar(50) DEFAULT NULL,
  `id_beekeeper` varchar(50) DEFAULT NULL,
  KEY `id_beekeeper` (`id_beekeeper`),
  KEY `id_package` (`id_package`),
  KEY `date_heure` (`date_heure`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `workshop`
--

DROP TABLE IF EXISTS `workshop`;
CREATE TABLE IF NOT EXISTS `workshop` (
  `id_workshop` int NOT NULL AUTO_INCREMENT,
  `desc_workshop` varchar(250) DEFAULT NULL,
  `price` double NOT NULL,
  `places_left` int NOT NULL,
  `img_path_workshop` varchar(250) DEFAULT NULL,
  `id_beekeeper` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_workshop`),
  KEY `id_beekeeper` (`id_beekeeper`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
