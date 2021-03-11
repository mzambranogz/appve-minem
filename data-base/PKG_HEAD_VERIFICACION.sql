--------------------------------------------------------
-- Archivo creado  - jueves-marzo-11-2021   
--------------------------------------------------------
--------------------------------------------------------
--  DDL for Package PKG_ELECTROMOV_VERIFICACION
--------------------------------------------------------

  CREATE OR REPLACE PACKAGE "ELECTROMOVILIDAD"."PKG_ELECTROMOV_VERIFICACION" AS 

  PROCEDURE USP_SEL_BUSQ_ESTACIONES(
    PI_CODIGO NUMBER,
    PI_NOMBRES VARCHAR2,
    PI_EMPRESA VARCHAR2,
    PI_REGISTROS NUMBER,
    PI_PAGINA NUMBER,
    PI_COLUMNA VARCHAR2,
    PI_ORDEN VARCHAR2,
    PO_REF OUT SYS_REFCURSOR
  );
  
  PROCEDURE USP_REVISION_ESTACION(
    PI_ID_ESTACION NUMBER,
    PI_ID_USUARIO NUMBER,
    PI_FLAG_ESTADO VARCHAR2,
    PO_ROWAFFECTED OUT NUMBER
  );

END PKG_ELECTROMOV_VERIFICACION;

/
