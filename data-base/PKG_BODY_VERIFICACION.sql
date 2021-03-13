--------------------------------------------------------
-- Archivo creado  - jueves-marzo-11-2021   
--------------------------------------------------------
--------------------------------------------------------
--  DDL for Package Body PKG_ELECTROMOV_VERIFICACION
--------------------------------------------------------

  CREATE OR REPLACE PACKAGE BODY "ELECTROMOVILIDAD"."PKG_ELECTROMOV_VERIFICACION" AS

  PROCEDURE USP_SEL_BUSQ_ESTACIONES(
    PI_CODIGO NUMBER,
    PI_NOMBRES VARCHAR2,
    PI_EMPRESA VARCHAR2,
    PI_REGISTROS NUMBER,
    PI_PAGINA NUMBER,
    PI_COLUMNA VARCHAR2,
    PI_ORDEN VARCHAR2,
    PO_REF OUT SYS_REFCURSOR
  ) AS
    vTOTAL_REG INTEGER;
    vPAGINA_TOTAL INTEGER;
    vPAGINA_ACTUAL INTEGER := PI_PAGINA;
    vPAGINA_INICIAL INTEGER := 0;
    vQUERY_CONT VARCHAR2(10000) := '';
    vQUERY_SELECT VARCHAR2(10000) := '';
    vCOLUMNA VARCHAR2(200);
  BEGIN
    vQUERY_CONT := 'SELECT  COUNT(1)
                    FROM T_GENM_ESTACION E
                    INNER JOIN T_GENM_USUARIO U ON E.ID_USUARIO = U.ID_USUARIO
                    INNER JOIN T_MAE_ROL R ON U.ID_ROL = R.ID_ROL
                    INNER JOIN T_GENM_INSTITUCION INST ON U.ID_INSTITUCION = INST.ID_INSTITUCION
                    INNER JOIN T_MAE_ESTADO_ESTACION EE ON E.ID_ESTADO = EE.ID_ESTADO
                    WHERE (
                    LOWER(TRANSLATE(U.NOMBRES,''¡…Õ”⁄·ÈÌÛ˙'',''AEIOUaeiou'')) like ''%''|| LOWER(TRANSLATE('''|| PI_NOMBRES ||''',''¡…Õ”⁄·ÈÌÛ˙'',''AEIOUaeiou'')) ||''%'' OR
                    LOWER(TRANSLATE(INST.RAZON_SOCIAL,''¡…Õ”⁄·ÈÌÛ˙'',''AEIOUaeiou'')) like ''%''|| LOWER(TRANSLATE('''|| PI_EMPRESA ||''',''¡…Õ”⁄·ÈÌÛ˙'',''AEIOUaeiou'')) ||''%'' OR
                    E.ID_ESTACION = '|| PI_CODIGO ||')';
    EXECUTE IMMEDIATE vQUERY_CONT INTO vTOTAL_REG;

    vPAGINA_TOTAL := CEIL(TO_NUMBER(vTOTAL_REG) / TO_NUMBER(PI_REGISTROS));
    IF vPAGINA_ACTUAL = 0 THEN
      vPAGINA_ACTUAL := 1;
    END IF;
    IF vPAGINA_ACTUAL > vPAGINA_TOTAL THEN
      vPAGINA_ACTUAL := vPAGINA_TOTAL;
    END IF;

    vPAGINA_INICIAL := vPAGINA_ACTUAL - 1;
        
    IF PI_COLUMNA = 'ID_ESTACION' THEN
      vCOLUMNA := 'E.ID_ESTACION';
    ELSE 
      IF PI_COLUMNA = 'NOMBRES' THEN
          vCOLUMNA := 'U.NOMBRES';
      ELSE
          IF PI_COLUMNA = 'INSTITUCION' THEN
            vCOLUMNA := 'INST.RAZON_SOCIAL';
          ELSE
            IF PI_COLUMNA = 'REG_FECHA' THEN
              vCOLUMNA := 'E.REG_FECHA';
            ELSE
              IF PI_COLUMNA = 'ESTADO' THEN
                vCOLUMNA := 'EE.NOMBRE';
              ELSE
                vCOLUMNA := PI_COLUMNA;
              END IF;
            END IF;
          END IF;
      END IF;
    END IF;

    vQUERY_SELECT := 'SELECT * FROM
                        (
                        SELECT  E.*,
                                U.NOMBRES NOMBRE_USUARIO,
                                INST.RAZON_SOCIAL NOMBRE_INSTITUCION,
                                EE.NOMBRE NOMBRE_ESTADO,
                                ROW_NUMBER() OVER (ORDER BY ' || vCOLUMNA || ' ' || PI_ORDEN ||') AS ROWNUMBER,'
                                || vPAGINA_TOTAL || ' AS TOTAL_PAGINAS,'
                                || vPAGINA_ACTUAL || ' AS PAGINA,'
                                || PI_REGISTROS || ' AS CANTIDAD_REGISTROS,'
                                || vTOTAL_REG || ' AS TOTAL_REGISTROS
                        FROM T_GENM_ESTACION E
                        INNER JOIN T_GENM_USUARIO U ON E.ID_USUARIO = U.ID_USUARIO
                        INNER JOIN T_MAE_ROL R ON U.ID_ROL = R.ID_ROL
                        INNER JOIN T_GENM_INSTITUCION INST ON U.ID_INSTITUCION = INST.ID_INSTITUCION
                        INNER JOIN T_MAE_ESTADO_ESTACION EE ON E.ID_ESTADO = EE.ID_ESTADO
                        WHERE (
                        LOWER(TRANSLATE(U.NOMBRES,''¡…Õ”⁄·ÈÌÛ˙'',''AEIOUaeiou'')) like ''%''|| LOWER(TRANSLATE('''|| PI_NOMBRES ||''',''¡…Õ”⁄·ÈÌÛ˙'',''AEIOUaeiou'')) ||''%'' OR
                        LOWER(TRANSLATE(INST.RAZON_SOCIAL,''¡…Õ”⁄·ÈÌÛ˙'',''AEIOUaeiou'')) like ''%''|| LOWER(TRANSLATE('''|| PI_EMPRESA ||''',''¡…Õ”⁄·ÈÌÛ˙'',''AEIOUaeiou'')) ||''%'' OR
                        E.ID_ESTACION = '|| PI_CODIGO ||')
                        )
                    WHERE  ROWNUMBER BETWEEN ' || TO_CHAR(PI_REGISTROS * vPAGINA_INICIAL + 1) || ' AND ' || TO_CHAR(PI_REGISTROS * (vPAGINA_INICIAL + 1));

    OPEN PO_REF FOR vQUERY_SELECT;
  END USP_SEL_BUSQ_ESTACIONES;
  
  PROCEDURE USP_REVISION_ESTACION(
    PI_ID_ESTACION NUMBER,
    PI_ID_USUARIO NUMBER,
    PI_FLAG_ESTADO VARCHAR2,
    PO_ROWAFFECTED OUT NUMBER
  ) AS
  BEGIN
    UPDATE T_GENM_ESTACION
    SET    ID_ESTADO = PI_FLAG_ESTADO,
           UPD_USUARIO = PI_ID_USUARIO,
           UPD_FECHA = SYSDATE
    WHERE  ID_ESTACION = PI_ID_ESTACION;
    PO_ROWAFFECTED := SQL%ROWCOUNT;
  END USP_REVISION_ESTACION;

END PKG_ELECTROMOV_VERIFICACION;

/
