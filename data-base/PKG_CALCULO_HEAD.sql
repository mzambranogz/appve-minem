--------------------------------------------------------
-- Archivo creado  - martes-febrero-16-2021   
--------------------------------------------------------
--------------------------------------------------------
--  DDL for Package PKG_ELECTROMOV_CALCULO
--------------------------------------------------------

  CREATE OR REPLACE PACKAGE "ELECTROMOVILIDAD"."PKG_ELECTROMOV_CALCULO" AS 

  PROCEDURE USP_SEL_LIST_TIPO_COMBUS(
    PO_REF OUT SYS_REFCURSOR
  );
  
  PROCEDURE USP_SEL_LIST_TIPO_TRANSP(
    PO_REF OUT SYS_REFCURSOR
  );
  
  PROCEDURE USP_SEL_LIST_TIPO_VEH_CONV(
    PO_REF OUT SYS_REFCURSOR
  );
  
  PROCEDURE USP_SEL_LIST_TIPO_VEH_ELEC(
    PO_REF OUT SYS_REFCURSOR
  );
  
  PROCEDURE USP_SEL_GET_FORMULA(
    PI_ID_CASO NUMBER,
    PO_REF OUT SYS_REFCURSOR
  );
  
  PROCEDURE USP_SEL_FACTOR_PARAMETRO(
    PI_ID_FACTOR NUMBER,
    PO_REF OUT SYS_REFCURSOR
  );
  
  PROCEDURE USP_SEL_FACTOR_VALOR(
    PI_ID_FACTOR NUMBER,
    PI_SQL_WHERE VARCHAR2,
    PO_REF OUT SYS_REFCURSOR
  );
  
  PROCEDURE USP_MAN_GUARDA_INSTITUCION(
    PI_ID_INSTITUCION NUMBER,
    PI_RUC VARCHAR2,
    PI_RAZON_SOCIAL VARCHAR2,
    PI_CORREO VARCHAR2,
    PI_TELEFONO VARCHAR2,
    PI_DIRECCION VARCHAR2,
    PI_UPD_USUARIO NUMBER,
    PI_ID_GET OUT NUMBER,
    PO_ROWAFFECTED OUT NUMBER
  );
  
  PROCEDURE USP_SEL_LISTA_FACTOR_1P(
    PI_ID_FACTOR NUMBER,
    PI_ID_P1 NUMBER,
    PI_V_P1 NUMBER,
    PO_REF OUT SYS_REFCURSOR
  );
  
  PROCEDURE USP_SEL_LISTA_FACTOR_2P(
    PI_ID_FACTOR NUMBER,
    PI_ID_P1 NUMBER,
    PI_ID_P2 NUMBER,
    PI_V_P1 NUMBER,
    PI_V_P2 NUMBER,
    PO_REF OUT SYS_REFCURSOR
  );
  
  PROCEDURE USP_SEL_LISTA_FACTOR_3P(
    PI_ID_FACTOR NUMBER,
    PI_ID_P1 NUMBER,
    PI_ID_P2 NUMBER,
    PI_ID_P3 NUMBER,
    PI_V_P1 NUMBER,
    PI_V_P2 NUMBER,
    PI_V_P3 NUMBER,
    PO_REF OUT SYS_REFCURSOR
  );
  
  PROCEDURE USP_SEL_LIST_MODELO_VEH(
    PO_REF OUT SYS_REFCURSOR
  );
  
  PROCEDURE USP_SEL_LIST_TIPO_CARGADOR(
    PO_REF OUT SYS_REFCURSOR
  );
  
  PROCEDURE USP_SEL_LIST_CARGADOR_POTENC(
    PO_REF OUT SYS_REFCURSOR
  );
  
  PROCEDURE USP_SEL_LIST_DEPARTAMENTO(
    PO_REF OUT SYS_REFCURSOR
  );

END PKG_ELECTROMOV_CALCULO;

/
