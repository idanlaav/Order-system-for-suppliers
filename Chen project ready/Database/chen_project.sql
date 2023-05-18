-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 17, 2023 at 06:06 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `chen_project`
--
CREATE DATABASE IF NOT EXISTS `chen_project` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `chen_project`;

-- --------------------------------------------------------

--
-- Table structure for table `bids`
--

CREATE TABLE `bids` (
  `bidId` int(11) NOT NULL,
  `ProductId` int(11) NOT NULL,
  `stock` int(11) NOT NULL,
  `stockTotalPrice` decimal(6,2) NOT NULL,
  `orderId` int(11) NOT NULL,
  `itemName` varchar(50) NOT NULL,
  `itemStock` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `orderId` int(11) NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `productId` int(11) NOT NULL,
  `productName` varchar(50) NOT NULL,
  `productStock` int(11) NOT NULL,
  `productPrice` decimal(6,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`productId`, `productName`, `productStock`, `productPrice`) VALUES
(1, 'מיכל עיבוי', 1, '23.22'),
(2, 'תושבת אחורית', 1, '126.55'),
(3, 'גומיה מייצבת', 1, '1.60'),
(4, 'cx דיסק', 1, '5.60'),
(5, 'תושבת קדמית ', 1, '211.00'),
(6, 'מנעול מכסה', 1, '21.10'),
(7, 'מעבד', 1, '345.00'),
(8, 'מיסב', 1, '14.40'),
(9, 'בורג למשולש תחתון', 1, '17.90'),
(10, 'tx', 1, '2.40');

-- --------------------------------------------------------

--
-- Table structure for table `supplierOffers`
--

CREATE TABLE `supplierOffers` (
  `supplierOfferId` int(11) NOT NULL,
  `firstItemName` varchar(50) DEFAULT NULL,
  `firstItemStock` int(11) DEFAULT NULL,
  `secondItemName` varchar(50) DEFAULT NULL,
  `secondItemStock` int(11) DEFAULT NULL,
  `thirdItemName` varchar(50) DEFAULT NULL,
  `thirdItemStock` int(11) DEFAULT NULL,
  `fourItemName` varchar(50) DEFAULT NULL,
  `fourItemStock` int(11) DEFAULT NULL,
  `fiveItemName` varchar(50) DEFAULT NULL,
  `fiveItemStock` int(11) DEFAULT NULL,
  `countryName` varchar(50) NOT NULL,
  `customerName` varchar(50) NOT NULL,
  `marketingMan` varchar(50) NOT NULL,
  `offerPrice` decimal(8,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `supplierOffers`
--

INSERT INTO `supplierOffers` (`supplierOfferId`, `firstItemName`, `firstItemStock`, `secondItemName`, `secondItemStock`, `thirdItemName`, `thirdItemStock`, `fourItemName`, `fourItemStock`, `fiveItemName`, `fiveItemStock`, `countryName`, `customerName`, `marketingMan`, `offerPrice`) VALUES
(13, 'TX-83', 8, 'Ma365', 6, 'EL20M8', 3, 'RZ864', 5, 'BW123', 1, 'Israel', 'yuval', 'Idan', '9999.99'),
(14, 'TX-83', 8, 'Ma365', 6, 'EL20M8', 3, 'RZ864', 5, 'BW123', 1, 'Israel', 'yuval', 'Idan', '10000.00'),
(15, 'TX-83', 19, 'Ma365', 23, 'EL20M8', 55, 'RZ864', 180, 'BW123', 1, 'Israel', 'yuval', 'Idan', '199737.39'),
(16, 'TX-83', 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Israel', '3', 'Hen', '1454.58'),
(17, NULL, NULL, 'Ma365', 4, NULL, NULL, NULL, NULL, NULL, NULL, 'India', '33232', 'Hen', '2582.20'),
(18, NULL, NULL, 'Ma365', 2, 'EL20M8', 2, NULL, NULL, NULL, NULL, 'India', '3fdgdfg', 'Yaccov', '2529.70'),
(19, 'TX-83', 3, NULL, NULL, 'EL20M8', 3, NULL, NULL, 'BW123', 1, 'U.S.A.', 'dsfsdf', 'Hen', '3639.18'),
(22, NULL, 0, NULL, 0, 'EL20M8', 1, NULL, 0, NULL, 0, 'France', 'dsfsdfds', 'Yaccov', '619.30'),
(23, NULL, 0, NULL, 0, 'EL20M8', 1, NULL, 0, NULL, 0, 'Italy', 'sdfdsf', 'Yaccov', '619.30'),
(24, 'TX-83', 1, NULL, 0, NULL, 0, NULL, 0, NULL, 0, 'India', 'sdfsdv', 'Hen', '484.86'),
(25, NULL, 0, NULL, 0, 'EL20M8', 1, NULL, 0, NULL, 0, 'Italy', 'sdvsd', 'Hen', '619.30'),
(26, NULL, 0, NULL, 0, 'EL20M8', 3, NULL, 0, NULL, 0, 'India', 'sdffsd', 'Yaccov', '1857.90'),
(27, NULL, 0, NULL, 0, NULL, 0, 'RZ864', 2, NULL, 0, 'India', 'dfggf', 'Hen', '1569.88'),
(28, NULL, 0, NULL, 0, 'EL20M8', 2, NULL, 0, NULL, 0, 'France', 'vcxvxc', 'Yaccov', '1238.60'),
(29, NULL, 0, 'Ma365', 2, NULL, 0, NULL, 0, NULL, 0, 'France', 'dfgdfg', 'Yaccov', '1291.10'),
(30, NULL, 0, 'Ma365', 2, NULL, 0, NULL, 0, NULL, 0, 'Italy', 'cxvxcv', 'Hen', '1291.10'),
(31, NULL, 0, NULL, 0, NULL, 0, 'RZ864', 2, NULL, 0, 'U.S.A.', 'sdfsdfdsf', 'Yaccov', '1569.88'),
(32, 'TX-83', 4, 'Ma365', 3, 'EL20M8', 2, NULL, 0, NULL, 0, 'India', 'kmnk', 'Hen', '5728.45'),
(33, 'TX-83', 3, NULL, 0, 'EL20M8', 3, NULL, 0, NULL, 0, 'U.S.A.', 'mkjnkj', 'Sara', '4074.35'),
(34, 'TX-83', 1, 'Ma365', 1, 'EL20M8', 2, 'RZ864', 1, 'BW123', 3, 'France', 'henhen', 'Hen', '5374.27'),
(35, 'TX-83', 1, 'Ma365', 1, 'EL20M8', 1, 'RZ864', 1, NULL, 0, 'Israel', 'eee', 'Hen', '2534.65');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(15) NOT NULL,
  `lastName` varchar(25) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(128) NOT NULL,
  `role` varchar(5) NOT NULL DEFAULT 'User'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `email`, `password`, `role`) VALUES
(1, 'idan', 'idan', 'idan@gmail.com', '475594658ee267ed38042cd53243a6e8870a2e3f1f68b78b537cad8cddfd6d7ba924dfd617da21f10268e3d9938b196db8c8dc1a86cc578d999f9ac7b20a7e77', 'Admin'),
(7, 'hen', 'hen', 'hen@gmail.com', '475594658ee267ed38042cd53243a6e8870a2e3f1f68b78b537cad8cddfd6d7ba924dfd617da21f10268e3d9938b196db8c8dc1a86cc578d999f9ac7b20a7e77', 'User');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bids`
--
ALTER TABLE `bids`
  ADD PRIMARY KEY (`bidId`),
  ADD KEY `ProductId` (`ProductId`),
  ADD KEY `orderId` (`orderId`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`orderId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`productId`);

--
-- Indexes for table `supplierOffers`
--
ALTER TABLE `supplierOffers`
  ADD PRIMARY KEY (`supplierOfferId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bids`
--
ALTER TABLE `bids`
  MODIFY `bidId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=657;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `orderId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `productId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `supplierOffers`
--
ALTER TABLE `supplierOffers`
  MODIFY `supplierOfferId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bids`
--
ALTER TABLE `bids`
  ADD CONSTRAINT `bids_ibfk_1` FOREIGN KEY (`ProductId`) REFERENCES `products` (`productId`),
  ADD CONSTRAINT `bids_ibfk_2` FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
