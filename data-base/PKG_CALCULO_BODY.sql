--------------------------------------------------------
-- Archivo creado  - s�bado-febrero-20-2021   
--------------------------------------------------------
--------------------------------------------------------
--  DDL for Package Body PKG_ELECTROMOV_CALCULO
--------------------------------------------------------

  CREATE OR REPLACE PACKAGE BODY "ELECTROMOVILIDAD"."PKG_ELECTROMOV_CALCULO" AS

  PROCEDURE USP_SEL_LIST_TIPO_COMBUS(
    PO_REF OUT SYS_REFCURSOR
  ) AS
  BEGIN
    OPEN PO_REF FOR
    SELECT * FROM T_GENM_TIPO_COMBUSTIBLE
    ORDER BY ID_TIPO_COMBUSTIBLE;
  END USP_SEL_LIST_TIPO_COMBUS;

  PROCEDURE USP_SEL_LIST_TIPO_TRANSP(
    PO_REF OUT SYS_REFCURSOR
  ) AS
  BEGIN
    OPEN PO_REF FOR
    SELECT * FROM T_GENM_TIPO_TRANSPORTE
    ORDER BY ID_TIPO_TRANSPORTE;
  END USP_SEL_LIST_TIPO_TRANSP;
  
  PROCEDURE USP_SEL_LIST_TIPO_VEH_CONV(
    PO_REF OUT SYS_REFCURSOR
  ) AS
  BEGIN
    OPEN PO_REF FOR
    SELECT * FROM T_GENM_TIPO_VEHICULO_CONV
    ORDER BY ID_TIPO_VEHICULO_CONV;
  END USP_SEL_LIST_TIPO_VEH_CONV;
  
  PROCEDURE USP_SEL_LIST_TIPO_VEH_ELEC(
    PO_REF OUT SYS_REFCURSOR
  ) AS
  BEGIN
    OPEN PO_REF FOR
    SELECT * FROM T_GENM_TIPO_VEHICULO_ELEC
    ORDER BY ID_TIPO_VEHICULO_ELEC;
  END USP_SEL_LIST_TIPO_VEH_ELEC;
  
  PROCEDURE USP_SEL_GET_FORMULA(
    PI_ID_CASO NUMBER,
    PO_REF OUT SYS_REFCURSOR
  ) AS
  BEGIN
    OPEN PO_REF FOR
    SELECT * FROM T_GENM_FORMULA
    WHERE ID_CASO = PI_ID_CASO;
  END USP_SEL_GET_FORMULA;
  
  PROCEDURE USP_SEL_FACTOR_PARAMETRO(
    PI_ID_FACTOR NUMBER,
    PO_REF OUT SYS_REFCURSOR
  )
  AS
  BEGIN
        OPEN PO_REF FOR
        SELECT  FP.*,
                (SELECT COUNT(1)
                FROM    T_MAE_FACTOR_PARAMETRO FP
                WHERE   FP.ID_FACTOR = PI_ID_FACTOR
                        AND FP.ID_PARAMETRO IS NOT NULL) NUMERO_PARAMETROS
        FROM    T_MAE_FACTOR F,
                T_MAE_FACTOR_PARAMETRO FP
        WHERE   F.ID_FACTOR = PI_ID_FACTOR
                AND F.ID_FACTOR = FP.ID_FACTOR
                AND FP.ID_PARAMETRO IS NOT NULL
                AND FP.FLAG_ESTADO = '1'
        ORDER BY FP.ORDEN;
  END USP_SEL_FACTOR_PARAMETRO;
  
  PROCEDURE USP_SEL_FACTOR_VALOR(
    PI_ID_FACTOR NUMBER,
    PI_SQL_WHERE VARCHAR2,
    PO_REF OUT SYS_REFCURSOR
  )
  AS
    V_SQL VARCHAR2(4000);
  BEGIN
    V_SQL := 'SELECT  *
            FROM    T_MAE_FACTOR_DATA F
            WHERE   F.ID_FACTOR = ' || TO_CHAR(PI_ID_FACTOR) || ' ';
    V_SQL := V_SQL || PI_SQL_WHERE;

    OPEN PO_REF FOR V_SQL;
  END USP_SEL_FACTOR_VALOR;
  
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
  ) AS
  BEGIN    
    IF PI_ID_INSTITUCION = -1 THEN
      PI_ID_GET := SQ_GENM_INSTITUCION.NEXTVAL();
      INSERT INTO T_GENM_INSTITUCION (ID_INSTITUCION, RUC, RAZON_SOCIAL, CORREO, TELEFONO, DIRECCION, ID_USUARIO, REG_USUARIO, REG_FECHA)
      VALUES (PI_ID_GET, PI_RUC, PI_RAZON_SOCIAL, PI_CORREO, PI_TELEFONO, PI_DIRECCION, PI_UPD_USUARIO, PI_UPD_USUARIO, SYSDATE);
    END IF;
    PO_ROWAFFECTED := SQL%ROWCOUNT;
  END USP_MAN_GUARDA_INSTITUCION;
  
  PROCEDURE USP_SEL_LISTA_FACTOR_1P(
    PI_ID_FACTOR NUMBER,
    PI_ID_P1 NUMBER,
    PI_V_P1 NUMBER,
    PO_REF OUT SYS_REFCURSOR
  )AS
  BEGIN
    OPEN PO_REF FOR
    SELECT  *
    FROM    T_MAE_FACTOR_DATA F
    WHERE   F.ID_FACTOR = PI_ID_FACTOR AND F.PARAMETROS = PI_ID_P1 AND F.VALORES = PI_V_P1;
  END USP_SEL_LISTA_FACTOR_1P;
  
  PROCEDURE USP_SEL_LISTA_FACTOR_2P(
    PI_ID_FACTOR NUMBER,
    PI_ID_P1 NUMBER,
    PI_ID_P2 NUMBER,
    PI_V_P1 NUMBER,
    PI_V_P2 NUMBER,
    PO_REF OUT SYS_REFCURSOR
  )AS
  BEGIN
    OPEN PO_REF FOR
    SELECT  *
    FROM    T_MAE_FACTOR_DATA F
    WHERE   F.ID_FACTOR = PI_ID_FACTOR AND F.PARAMETROS = PI_ID_P1 || '|' || PI_ID_P2 AND F.VALORES = PI_V_P1 || '|' || PI_V_P2;
  END USP_SEL_LISTA_FACTOR_2P;
  
  PROCEDURE USP_SEL_LISTA_FACTOR_3P(
    PI_ID_FACTOR NUMBER,
    PI_ID_P1 NUMBER,
    PI_ID_P2 NUMBER,
    PI_ID_P3 NUMBER,
    PI_V_P1 NUMBER,
    PI_V_P2 NUMBER,
    PI_V_P3 NUMBER,
    PO_REF OUT SYS_REFCURSOR
  )AS
  BEGIN
    OPEN PO_REF FOR
    SELECT  *
    FROM    T_MAE_FACTOR_DATA F
    WHERE   F.ID_FACTOR = PI_ID_FACTOR AND F.PARAMETROS = PI_ID_P1 || '|' || PI_ID_P2 || '|' || PI_ID_P3 AND F.VALORES = PI_V_P1 || '|' || PI_V_P2 || '|' || PI_V_P3;
  END USP_SEL_LISTA_FACTOR_3P;
  
  PROCEDURE USP_SEL_LIST_MODELO_VEH(
    PO_REF OUT SYS_REFCURSOR
  ) AS
  BEGIN
    OPEN PO_REF FOR
    SELECT * FROM T_GENM_MODELO_VEHICULO_ELEC
    ORDER BY ID_MODELO;
  END USP_SEL_LIST_MODELO_VEH;
  
  PROCEDURE USP_SEL_LIST_TIPO_CARGADOR(
    PO_REF OUT SYS_REFCURSOR
  ) AS
  BEGIN
    OPEN PO_REF FOR
    SELECT * FROM T_GENM_TIPO_CARGADOR
    ORDER BY ID_CARGADOR;
  END USP_SEL_LIST_TIPO_CARGADOR;
  
  PROCEDURE USP_SEL_LIST_CARGADOR_POTENC(
    PO_REF OUT SYS_REFCURSOR
  ) AS
  BEGIN
    OPEN PO_REF FOR
    SELECT * FROM T_GENM_CARGADOR_POTENCIA
    ORDER BY ID_POTENCIA;
  END USP_SEL_LIST_CARGADOR_POTENC;
  
  PROCEDURE USP_SEL_LIST_DEPARTAMENTO(
    PO_REF OUT SYS_REFCURSOR
  ) AS
  BEGIN
    OPEN PO_REF FOR
    SELECT * FROM T_MAE_DEPARTAMENTO
    ORDER BY ID_DEPARTAMENTO;
  END USP_SEL_LIST_DEPARTAMENTO;
  
  PROCEDURE USP_PRC_GUARDAR_INSTITUCION(
    PI_ID_INSTITUCION NUMBER,
    PI_RUC VARCHAR2,
    PI_RAZON_SOCIAL VARCHAR2,
    PI_CORREO VARCHAR2,
    PI_TELEFONO VARCHAR2,
    PI_DIRECCION VARCHAR2,    
    PI_UPD_USUARIO NUMBER,
    PI_ID_GET IN OUT NUMBER,
    PO_ROWAFFECTED OUT NUMBER
  ) AS
  BEGIN    
    IF PI_ID_INSTITUCION = -1 THEN
      PI_ID_GET := SQ_GENM_INSTITUCION.NEXTVAL();
      INSERT INTO T_GENM_INSTITUCION
      (ID_INSTITUCION, RUC, RAZON_SOCIAL, CORREO, TELEFONO, DIRECCION, REG_USUARIO, REG_FECHA)
      VALUES
      (PI_ID_GET, PI_RUC, PI_RAZON_SOCIAL, PI_CORREO, PI_TELEFONO, PI_DIRECCION, PI_UPD_USUARIO, SYSDATE);
      
      UPDATE T_GENM_USUARIO SET ID_INSTITUCION = PI_ID_INSTITUCION WHERE ID_USUARIO = PI_UPD_USUARIO;
    ELSE
      UPDATE T_GENM_INSTITUCION C SET
      C.RUC = PI_RUC,
      C.RAZON_SOCIAL = PI_RAZON_SOCIAL,
      C.CORREO = PI_CORREO,
      C.TELEFONO = PI_TELEFONO,
      C.DIRECCION = PI_DIRECCION,
      C.UPD_USUARIO = PI_UPD_USUARIO,
      C.UPD_FECHA = SYSDATE
      WHERE C.ID_INSTITUCION = PI_ID_INSTITUCION;
      PI_ID_GET := PI_ID_INSTITUCION;
    END IF;
    PO_ROWAFFECTED := SQL%ROWCOUNT;
  END USP_PRC_GUARDAR_INSTITUCION;
  
  PROCEDURE USP_PRC_GUARDAR_ESTACION(
    PI_ID_ESTACION NUMBER,
    PI_ID_USUARIO NUMBER,
    PI_DESCRIPCION VARCHAR2,
    PI_MODELO VARCHAR2,
    PI_MARCA VARCHAR2,
    PI_POTENCIA NUMBER,
    PI_MODO_CARGA VARCHAR2,
    PI_TIPO_CARGADOR VARCHAR2,
    PI_TIPO_CONECTOR VARCHAR2,
    PI_CANTIDAD_CONECTOR NUMBER,
    PI_HORA_DESDE VARCHAR2,
    PI_HORA_HASTA VARCHAR2,
    PI_TARIFA_SERVICIO NUMBER,
    PI_ID_ESTADO NUMBER,
    PI_UPD_USUARIO NUMBER,
    PI_ID_GET IN OUT NUMBER,
    PO_ROWAFFECTED OUT NUMBER
  ) AS
  BEGIN    
    IF PI_ID_ESTACION = -1 THEN
      PI_ID_GET := SQ_GENM_ESTACION.NEXTVAL();
      INSERT INTO T_GENM_ESTACION
      (ID_ESTACION, DESCRIPCION, MODELO, MARCA, POTENCIA, MODO_CARGA, TIPO_CARGADOR, TIPO_CONECTOR, CANTIDAD_CONECTOR, HORA_DESDE, HORA_HASTA, TARIFA_SERVICIO, ID_USUARIO, ID_ESTADO, REG_USUARIO, REG_FECHA)
      VALUES
      (PI_ID_GET, PI_DESCRIPCION, PI_MODELO, PI_MARCA, PI_POTENCIA, PI_MODO_CARGA, PI_TIPO_CARGADOR, PI_TIPO_CONECTOR, PI_CANTIDAD_CONECTOR, PI_HORA_DESDE, PI_HORA_HASTA, PI_TARIFA_SERVICIO, PI_ID_USUARIO, PI_ID_ESTADO, PI_UPD_USUARIO, SYSDATE);
    ELSE
      UPDATE T_GENM_ESTACION C SET
      C.DESCRIPCION = PI_DESCRIPCION,
      C.MODELO = PI_MODELO,
      C.MARCA = PI_MARCA,
      C.POTENCIA = PI_POTENCIA,
      C.MODO_CARGA = PI_MODO_CARGA,
      C.TIPO_CARGADOR = PI_TIPO_CARGADOR,
      C.TIPO_CONECTOR = PI_TIPO_CONECTOR,
      C.CANTIDAD_CONECTOR = PI_CANTIDAD_CONECTOR,
      C.HORA_DESDE = PI_HORA_DESDE,
      C.HORA_HASTA = PI_HORA_HASTA,
      C.TARIFA_SERVICIO = PI_TARIFA_SERVICIO,
      --C.ID_USUARIO = PI_UPD_USUARIO,
      C.ID_ESTADO = PI_ID_ESTADO,
      C.UPD_USUARIO = PI_UPD_USUARIO,
      C.UPD_FECHA = SYSDATE
      WHERE C.ID_ESTACION = PI_ID_ESTACION;
      PI_ID_GET := PI_ID_ESTACION;
    END IF;
    PO_ROWAFFECTED := SQL%ROWCOUNT;
  END USP_PRC_GUARDAR_ESTACION;
  
  PROCEDURE USP_PRC_MAN_DOCUMENTO_DATA(
    PI_ID_DOCUMENTO NUMBER,
    PI_ID_ESTACION VARCHAR2,
    PI_ARCHIVO_BASE VARCHAR2,   
    PI_UPD_USUARIO NUMBER,
    PO_ROWAFFECTED OUT NUMBER
  ) AS
    V_ID NUMBER;
  BEGIN    
    SELECT COUNT(*) INTO V_ID FROM T_GEND_DOCUMENTO_ESTACION WHERE ID_DOCUMENTO = PI_ID_DOCUMENTO AND ID_ESTACION = PI_ID_ESTACION;
    
    IF V_ID = 0 THEN
      INSERT INTO T_GEND_DOCUMENTO_ESTACION (ID_DOCUMENTO, ID_ESTACION, ARCHIVO_BASE, REG_USUARIO, REG_FECHA)
      VALUES (PI_ID_DOCUMENTO, PI_ID_ESTACION, PI_ARCHIVO_BASE, PI_UPD_USUARIO, SYSDATE);
    ELSE
      UPDATE T_GEND_DOCUMENTO_ESTACION C SET
      C.ARCHIVO_BASE = PI_ARCHIVO_BASE,
      C.UPD_USUARIO = PI_UPD_USUARIO,
      C.UPD_FECHA = SYSDATE
      WHERE C.ID_DOCUMENTO = PI_ID_DOCUMENTO AND C.ID_ESTACION = PI_ID_ESTACION;
    END IF;
    PO_ROWAFFECTED := SQL%ROWCOUNT;
  END USP_PRC_MAN_DOCUMENTO_DATA;
  
  PROCEDURE USP_PRC_MAN_DOCUMENTO_IMG(
    PI_ID_DOCUMENTO NUMBER,
    PI_ID_ESTACION VARCHAR2,
    PI_ARCHIVO_BASE VARCHAR2,
    PI_FLAG_ESTADO VARCHAR2,
    PI_UPD_USUARIO NUMBER,
    PO_ROWAFFECTED OUT NUMBER
  ) AS
    V_ID NUMBER;
  BEGIN    
    SELECT COUNT(*) INTO V_ID FROM T_GEND_IMAGEN_ESTACION WHERE ID_IMAGEN = PI_ID_DOCUMENTO AND ID_ESTACION = PI_ID_ESTACION;
    
    IF V_ID = 0 THEN
      INSERT INTO T_GEND_IMAGEN_ESTACION (ID_IMAGEN, ID_ESTACION, ARCHIVO_BASE, REG_USUARIO, REG_FECHA)
      VALUES (PI_ID_DOCUMENTO, PI_ID_ESTACION, PI_ARCHIVO_BASE, PI_UPD_USUARIO, SYSDATE);
    ELSE
      UPDATE T_GEND_IMAGEN_ESTACION C SET
      C.ARCHIVO_BASE = PI_ARCHIVO_BASE,
      C.FLAG_ESTADO = PI_FLAG_ESTADO,
      C.UPD_USUARIO = PI_UPD_USUARIO,
      C.UPD_FECHA = SYSDATE
      WHERE C.ID_IMAGEN = PI_ID_DOCUMENTO AND C.ID_ESTACION = PI_ID_ESTACION;
    END IF;
    PO_ROWAFFECTED := SQL%ROWCOUNT;
  END USP_PRC_MAN_DOCUMENTO_IMG;
  
  PROCEDURE USP_DEL_DOCUMENTO_IMG(
    PI_ID_ESTACION NUMBER
  ) AS
  BEGIN 
      UPDATE T_GEND_IMAGEN_ESTACION C SET
      C.FLAG_ESTADO = '0',
      C.UPD_FECHA = SYSDATE
      WHERE C.ID_ESTACION = PI_ID_ESTACION;
  END USP_DEL_DOCUMENTO_IMG;

END PKG_ELECTROMOV_CALCULO;

/
