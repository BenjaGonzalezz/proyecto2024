-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-10-2024 a las 06:44:37
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

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
(17);

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
  `imagen` varchar(255) NOT NULL,
  `color` varchar(255) NOT NULL,
  `medida` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`id_producto`, `categoria`, `nombre`, `stock`, `precio`, `imagen`, `color`, `medida`) VALUES
(17, 'mosquitero', 'Mosquitero PREMIUM', '44', '3.779', 'mosquitero.png', 'Blanco', '1x1'),
(45, 'ventana', 'Ventana 2', '15', '9.200', '45.webp', 'Gris', '150 x 120'),
(46, 'ventana', 'Ventana 3', '15', '2.700', '46.webp', 'Plateado', '1.20 x 1.0'),
(47, 'ventana', 'Ventana 4', '15', '5.950', '47.webp', 'Plateado', '1.50 x 2.00'),
(48, 'ventana', 'Ventana 5', '14', '7.850', '48.webp', 'Gris', '120 x 100'),
(50, 'ventana', 'Ventana 6', '15', '2.805', '50.webp', 'Plateado', '1 x 1'),
(51, 'ventana', 'Ventana 7', '19', '9.095', '51.webp', 'Gris', '150 x 200'),
(52, 'ventana', 'Ventana 8', '15', '2.309', '52.webp', 'Plateado', '1.2 x 0.4'),
(53, 'ventana', 'Ventana 9 ', '16', '5.469', '53.webp', 'Gris', '120 x 200'),
(54, 'ventana', 'Ventana 10', '19', '5.500', '54.webp', 'Blanco', '100 x 150'),
(55, 'puerta', 'Puerta 1', '15', '7.970', '55.webp', 'Plateado', '200 x 80'),
(56, 'puerta', 'Puerta 2', '5', '7.900', '56.webp', 'Plateado', '200 x 80'),
(57, 'puerta', 'Puerta 3', '10', '10.399', '57.webp', 'Blanco', '200 x 85'),
(58, 'puerta', 'Puerta 4', '14', '12.799', '58.webp', 'Plateado', '200 x 80'),
(59, 'puerta', 'Puerta 5', '15', '13.899', '59.webp', 'Blanco', '200 x 80'),
(60, 'puerta', 'Puerta 6', '14', '11.800', '60.webp', 'Plateado', '200 x 80'),
(61, 'puerta', 'Puerta 7', '13', '9.990', '61.webp', 'Plateado', '200 x 80'),
(62, 'puerta', 'Puerta 8', '16', '9.500', '62.webp', 'Marrón', '200 x 80'),
(63, 'puerta', 'Puerta 9', '14', '14.155', '63.webp', 'Marrón', '200 x 80'),
(64, 'puerta', 'Puerta 10', '15', '17.900', '64.webp', 'Plateado', '200 x 80');

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
(17, 88),
(17, 89);

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
(89, 'pendiente', '2024-10-22', '2024-10-15', 'UsuarioNormal1');

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
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT de la tabla `reserva`
--
ALTER TABLE `reserva`
  MODIFY `id_reserva` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;

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
