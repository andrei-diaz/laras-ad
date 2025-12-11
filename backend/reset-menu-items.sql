-- Script para reiniciar los items del menú
-- Ejecuta esto en tu base de datos PostgreSQL antes de reiniciar el backend

-- Borrar todos los items existentes
DELETE FROM menu_template_items;

-- O si prefieres truncar (más rápido y resetea el ID)
-- TRUNCATE TABLE menu_template_items RESTART IDENTITY;

-- Después de ejecutar esto, reinicia el backend y
-- el DataInitializer insertará los 53 nuevos items automáticamente
