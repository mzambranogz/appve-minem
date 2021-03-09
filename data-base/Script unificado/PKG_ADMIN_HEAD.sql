--------------------------------------------------------
-- Archivo creado  - martes-febrero-16-2021   
--------------------------------------------------------
--------------------------------------------------------
--  DDL for Package PKG_ELECTROMOV_ADMIN
--------------------------------------------------------

  CREATE OR REPLACE PACKAGE "ELECTROMOVILIDAD"."PKG_ELECTROMOV_ADMIN" AS 

  PROCEDURE USP_SEL_VERIFICAR_EMAIL(
    PI_EMAIL_USUARIO  IN VARCHAR2,
    PI_VERIFICAR      OUT NUMBER
  );
  
  PROCEDURE USP_SEL_USUARIO_CORREO(
        PI_CORREO  IN VARCHAR2,
        PO_CURSOR  OUT SYS_REFCURSOR
  );

END PKG_ELECTROMOV_ADMIN;

/
