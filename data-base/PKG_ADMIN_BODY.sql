--------------------------------------------------------
-- Archivo creado  - viernes-marzo-05-2021   
--------------------------------------------------------
--------------------------------------------------------
--  DDL for Package Body PKG_ELECTROMOV_ADMIN
--------------------------------------------------------

  CREATE OR REPLACE PACKAGE BODY "ELECTROMOVILIDAD"."PKG_ELECTROMOV_ADMIN" AS

  PROCEDURE USP_SEL_VERIFICAR_EMAIL(
    PI_EMAIL_USUARIO  IN VARCHAR2,
    PI_VERIFICAR      OUT NUMBER
  ) IS
    vVerificar  NUMBER;
  BEGIN
        SELECT COUNT(*) INTO vVerificar
        FROM T_GENM_USUARIO
        WHERE LOWER(TRANSLATE(CORREO,'ΑΙΝΣΪαινσϊ','AEIOUaeiou')) = LOWER(TRANSLATE(PI_EMAIL_USUARIO,'ΑΙΝΣΪαινσϊ','AEIOUaeiou'));
        PI_VERIFICAR := vVerificar;
  END USP_SEL_VERIFICAR_EMAIL;
  
  PROCEDURE USP_SEL_USUARIO_CORREO(
        PI_CORREO  IN VARCHAR2,
        PO_CURSOR  OUT SYS_REFCURSOR
  ) AS
  BEGIN
      OPEN PO_CURSOR FOR
      SELECT U.*, R.NOMBRE NOMBRE_ROL
      FROM T_GENM_USUARIO U
      INNER JOIN T_MAE_ROL R ON U.ID_ROL = R.ID_ROL
      WHERE LOWER(TRANSLATE(U.CORREO,'ΑΙΝΣΪαινσϊ','AEIOUaeiou')) = LOWER(TRANSLATE(PI_CORREO,'ΑΙΝΣΪαινσϊ','AEIOUaeiou'));
  END USP_SEL_USUARIO_CORREO;

END PKG_ELECTROMOV_ADMIN;

/
