-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-11-2024 a las 17:23:38
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `proyecto`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `usuario` varchar(255) NOT NULL,
  `telefono` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`usuario`, `telefono`, `email`) VALUES
('Administrador1', '000 000 000', 'Administrador1@admin.com'),
('UsuarioNormal1', '111 222 333', 'UsuarioNormal0@gmail.com'),
('UsuarioNormal2', '3131313131', 'UsuarioNormal2@a');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `oferta`
--

CREATE TABLE `oferta` (
  `id_producto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `oferta`
--

INSERT INTO `oferta` (`id_producto`) VALUES
(48);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `persona`
--

CREATE TABLE `persona` (
  `usuario` varchar(255) NOT NULL,
  `contraseña` varchar(60) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `role` varchar(20) NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `persona`
--

INSERT INTO `persona` (`usuario`, `contraseña`, `nombre`, `role`) VALUES
('Administrador1', '$2y$10$lQ4KLsNBW/H7s.Cmr8edmOkL0Acf99FNHqltKqx.wxvM3N6VTmbhW', 'Administrador1', 'admin'),
('UsuarioNormal1', '$2y$10$ct9Nz1RoEZDrU4xXDcF/E.Qu/PR80KEg/NbN1Udpg/4McgNQgvy7q', 'UsuarioNormal1', 'user'),
('UsuarioNormal2', '$2y$10$Kt58oL6J7Ay9kaSeRiEi0.HAEmnj3ikD4U3zUei7Mrpn157oFdJaS', 'UsuarioNormal2', 'user');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `id_producto` int(11) NOT NULL,
  `categoria` varchar(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `stock` varchar(255) NOT NULL,
  `precio` varchar(255) NOT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `color` varchar(255) NOT NULL,
  `medida` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`id_producto`, `categoria`, `nombre`, `stock`, `precio`, `imagen`, `color`, `medida`) VALUES
(45, 'ventana', 'Ventana 2', '12', '9200', '45.webp', 'Gris', '150 x 120'),
(46, 'ventana', 'Ventana 3', '14', '2700', '46.webp', 'Plateado', '1.20 x 1.0'),
(47, 'ventana', 'Ventana 4', '15', '5950', '47.webp', 'Plateado', '1.50 x 2.00'),
(48, 'ventana', 'Ventana 5', '53', '7850', '48.webp', 'Gris', '120 x 100'),
(50, 'ventana', 'Ventana 6', '15', '2805', '50.webp', 'Plateado', '1 x 1'),
(51, 'ventana', 'Ventana 7', '19', '9095', '51.webp', 'Gris', '150 x 200'),
(52, 'ventana', 'Ventana 8', '15', '2309', '52.webp', 'Plateado', '1.2 x 0.4'),
(53, 'ventana', 'Ventana 9 ', '16', '5469', '53.webp', 'Gris', '120 x 200'),
(54, 'ventana', 'Ventana 10', '19', '5500', '54.webp', 'Blanco', '100 x 150'),
(55, 'puerta', 'Puerta 1', '15', '7970', '55.webp', 'Plateado', '200 x 80'),
(56, 'puerta', 'Puerta 2', '5', '7900', '56.webp', 'Plateado', '200 x 80'),
(57, 'puerta', 'Puerta 3', '10', '10399', '57.webp', 'Blanco', '200 x 85'),
(58, 'puerta', 'Puerta 4', '14', '12799', '58.webp', 'Plateado', '200 x 80'),
(59, 'puerta', 'Puerta 5', '15', '13899', '59.webp', 'Blanco', '200 x 80'),
(60, 'puerta', 'Puerta 6', '14', '11800', '60.webp', 'Plateado', '200 x 80'),
(61, 'puerta', 'Puerta 7', '13', '9990', '61.webp', 'Plateado', '200 x 80'),
(62, 'puerta', 'Puerta 8', '16', '9500', '62.webp', 'Marrón', '200 x 80'),
(63, 'puerta', 'Puerta 9', '14', '14155', '63.webp', 'Marrón', '200 x 80'),
(64, 'puerta', 'Puerta 10', '15', '17900', '64.webp', 'Plateado', '200 x 80'),
(65, 'mosquitero', 'Mosquitero 1', '109', '1500', '65.jpg', 'Gris', '100x50'),
(66, 'mosquitero', 'Mosquitero 2', '31', '1750', '66.jpg', 'Negro', '100x100'),
(67, 'mosquitero', 'Mosquitero 3', '44', '1400', '67.jpg', 'Negro', '70x70'),
(68, 'mosquitero', 'Mosquitero 4', '40', '1900', '68.jpg', 'Gris', '80x40'),
(69, 'mosquitero', 'Mosquitero 5', '23', '2000', '69.jpg', 'Gris', '80x100'),
(70, 'mosquitero', 'Mosquitero 6', '27', '2500', '70.jpg', 'Blanco', '150x110'),
(71, 'mosquitero', 'Mosquitero 7', '34', '1900', '71.jpg', 'Blanco', '100x100'),
(72, 'mosquitero', 'Mosquitero 8', '12', '1450', '72.jpg', 'Negro', '80x40'),
(73, 'mosquitero', 'Mosquitero 9', '31', '1500', '73.jpg', 'Blanco', '60x100'),
(74, 'mosquitero', 'Mosquitero 10', '17', '1200', '74.jpg', 'Gris', '50X50'),
(75, 'mampara', 'Mampara 1', '12', '24000', '75.jpg', 'Negro', '80x80x180'),
(77, 'mampara', 'Mampara 2', '15', '24000', '77.jpg', 'Gris', '80x80x180'),
(78, 'mampara', 'Mampara 3', '19', '20.000', '78.jpg', 'Gris', '145x180'),
(79, 'mampara', 'Mampara 4', '27', '26000', '79.jpg', 'Gris', '80x80x180'),
(80, 'mampara', 'Mampara 5', '4', '30000', '80.jpg', 'Gris', '80x80x180'),
(81, 'mampara', 'Mampara 6', '19', '25000', '81.jpg', 'Gris', '80x80x180'),
(82, 'mampara', 'Mampara 7', '35', '27000', '82.jpg', 'Gris', '80x80x180'),
(83, 'mampara', 'Mampara 8', '19', '22000', '83.jpg', 'Gris', '145x180'),
(84, 'mampara', 'Mampara 9', '24', '23000', '84.jpg', 'Blanco', '145x180'),
(85, 'mampara', 'Mampara 10', '37', '29000', '85.jpg', 'Gris', '80x80x180'),
(86, 'pañofijo', 'Paño fijo 1', '13', '8500', '86.png', 'Gris', '50x100'),
(87, 'pañofijo', 'Paño fijo 2', '19', '7000', '87.png', 'Gris', '50x50'),
(88, 'pañofijo', 'Paño fijo 3', '25', '9000', '88.png', 'Blanco', '60x1.10'),
(89, 'pañofijo', 'Paño fijo 4', '34', '6550', '89.png', 'Gris', '70x120'),
(90, 'pañofijo', 'Paño fijo 5', '26', '5000', '90.png', 'Gris', '50x140'),
(91, 'pañofijo', 'Paño fijo 6', '15', '7300', '91.png', 'Negro', '60x100'),
(92, 'pañofijo', 'Paño fijo 7', '18', '8400', '92.png', 'Blanco', '80x100'),
(93, 'pañofijo', 'Paño fijo 8', '24', '5800', '93.png', 'Negro', '60x30'),
(94, 'pañofijo', 'Paño fijo 9', '23', '6700', '94.png', 'Blanco', '60x120'),
(96, 'pañofijo', 'Paño fijo 10', '7', '7300', '96.png', 'Negro', '30x80'),
(97, 'monoblock', 'Monoblock 1', '13', '12000', '97.jpg', 'Gris', '150x180'),
(98, 'monoblock', 'Monoblock 2', '27', '10000', '98.jpg', 'Gris', '150x150'),
(99, 'monoblock', 'Monoblock 3', '17', '11000', '99.jpg', 'Gris', '120x100'),
(100, 'monoblock', 'Monoblock 4', '22', '15000', '100.jpg', 'Gris', '200x200'),
(102, 'monoblock', 'Monoblock 5', '9', '11500', '102.jpg', 'Blanco', '120x100'),
(103, 'monoblock', 'Monoblock 6', '20', '15000', '103.jpg', 'Negro', '150x150'),
(104, 'monoblock', 'Monoblock 7', '29', '9000', '104.jpg', 'Blanco', '100X100'),
(105, 'monoblock', 'Monoblock 8', '34', '11500', '105.jpg', 'Gris', '120x100'),
(106, 'monoblock', 'Monoblock 9', '17', '10500', '106.jpg', 'Blanco', '120x100'),
(107, 'monoblock', 'Monoblock 10', '4', '14200', '107.webp', 'Gris', '150x120');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto_reserva`
--

CREATE TABLE `producto_reserva` (
  `id_producto` int(11) NOT NULL,
  `id_reserva` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `producto_reserva`
--

INSERT INTO `producto_reserva` (`id_producto`, `id_reserva`) VALUES
(45, 93),
(45, 94),
(46, 94),
(48, 96),
(65, 90),
(65, 91),
(65, 92),
(65, 95),
(65, 97),
(66, 95),
(66, 97),
(67, 97);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reserva`
--

CREATE TABLE `reserva` (
  `id_reserva` int(11) NOT NULL,
  `estado` varchar(255) NOT NULL,
  `fecha_limite` date NOT NULL,
  `fecha_reserva` date NOT NULL,
  `usuario_cliente` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `reserva`
--

INSERT INTO `reserva` (`id_reserva`, `estado`, `fecha_limite`, `fecha_reserva`, `usuario_cliente`) VALUES
(88, 'pendiente', '2024-10-22', '2024-10-15', 'UsuarioNormal1'),
(89, 'pendiente', '2024-10-22', '2024-10-15', 'UsuarioNormal1'),
(90, 'pendiente', '2024-11-08', '2024-11-01', 'UsuarioNormal1'),
(91, 'pendiente', '2024-11-08', '2024-11-01', 'UsuarioNormal1'),
(92, 'pendiente', '2024-11-08', '2024-11-01', 'UsuarioNormal1'),
(93, 'pendiente', '2024-11-08', '2024-11-01', 'UsuarioNormal1'),
(94, 'pendiente', '2024-11-08', '2024-11-01', 'UsuarioNormal1'),
(95, 'pendiente', '2024-11-08', '2024-11-01', 'UsuarioNormal1'),
(96, 'pendiente', '2024-11-09', '2024-11-02', 'UsuarioNormal1'),
(97, 'pendiente', '2024-11-12', '2024-11-05', 'UsuarioNormal1');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`usuario`);

--
-- Indices de la tabla `oferta`
--
ALTER TABLE `oferta`
  ADD UNIQUE KEY `id_producto` (`id_producto`);

--
-- Indices de la tabla `persona`
--
ALTER TABLE `persona`
  ADD PRIMARY KEY (`usuario`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`id_producto`);

--
-- Indices de la tabla `producto_reserva`
--
ALTER TABLE `producto_reserva`
  ADD PRIMARY KEY (`id_producto`,`id_reserva`),
  ADD KEY `id_reserva` (`id_reserva`);

--
-- Indices de la tabla `reserva`
--
ALTER TABLE `reserva`
  ADD PRIMARY KEY (`id_reserva`),
  ADD KEY `usuario_cliente` (`usuario_cliente`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=108;

--
-- AUTO_INCREMENT de la tabla `reserva`
--
ALTER TABLE `reserva`
  MODIFY `id_reserva` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=98;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD CONSTRAINT `cliente_ibfk_1` FOREIGN KEY (`usuario`) REFERENCES `persona` (`usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `oferta`
--
ALTER TABLE `oferta`
  ADD CONSTRAINT `oferta_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `producto_reserva`
--
ALTER TABLE `producto_reserva`
  ADD CONSTRAINT `producto_reserva_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `producto_reserva_ibfk_2` FOREIGN KEY (`id_reserva`) REFERENCES `reserva` (`id_reserva`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `reserva`
--
ALTER TABLE `reserva`
  ADD CONSTRAINT `reserva_ibfk_1` FOREIGN KEY (`usuario_cliente`) REFERENCES `cliente` (`usuario`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
