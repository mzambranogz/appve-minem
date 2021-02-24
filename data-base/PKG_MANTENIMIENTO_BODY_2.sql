--------------------------------------------------------
-- Archivo creado  - martes-febrero-16-2021   
--------------------------------------------------------
--------------------------------------------------------
--  DDL for Package Body PKG_ELECTROMOV_MANTENIMIENTO
--------------------------------------------------------

  CREATE OR REPLACE PACKAGE BODY "ELECTROMOVILIDAD"."PKG_ELECTROMOV_MANTENIMIENTO" AS
 
  --SECCION TIPO VEHICULO CONVENCIONAL
  PROCEDURE USP_SEL_LISTA_BUSQ_VEH_CONV(
    PI_BUSCAR VARCHAR2,
	PI_FLAG_ESTADO VARCHAR,
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
                    FROM T_GENM_TIPO_VEHICULO_CONV R
                    WHERE LOWER(TRANSLATE(R.NOMBRE,''ÁÉÍÓÚáéíóú'',''AEIOUaeiou'')) like ''%''|| LOWER(TRANSLATE('''|| PI_BUSCAR ||''',''ÁÉÍÓÚáéíóú'',''AEIOUaeiou'')) ||''%'' AND
                    R.FLAG_ESTADO = ''' || PI_FLAG_ESTADO || '''';
    EXECUTE IMMEDIATE vQUERY_CONT INTO vTOTAL_REG;
    
    vPAGINA_TOTAL := CEIL(TO_NUMBER(vTOTAL_REG) / TO_NUMBER(PI_REGISTROS));
    IF vPAGINA_ACTUAL = 0 THEN
      vPAGINA_ACTUAL := 1;
    END IF;
    IF vPAGINA_ACTUAL > vPAGINA_TOTAL THEN
      vPAGINA_ACTUAL := vPAGINA_TOTAL;
    END IF;

    vPAGINA_INICIAL := vPAGINA_ACTUAL - 1;
    vCOLUMNA := PI_COLUMNA;
    
    vQUERY_SELECT := 'SELECT * FROM 
                        (
                        SELECT  R.ID_TIPO_VEHICULO_CONV,
                                R.NOMBRE,
                                ROW_NUMBER() OVER (ORDER BY ' || vCOLUMNA || ' ' || PI_ORDEN ||') AS ROWNUMBER,'
                                || vPAGINA_TOTAL || ' AS TOTAL_PAGINAS,'
                                || vPAGINA_ACTUAL || ' AS PAGINA,'
                                || PI_REGISTROS || ' AS CANTIDAD_REGISTROS,'
                                || vTOTAL_REG || ' AS TOTAL_REGISTROS
                        FROM T_GENM_TIPO_VEHICULO_CONV R
                        WHERE LOWER(TRANSLATE(R.NOMBRE,''ÁÉÍÓÚáéíóú'',''AEIOUaeiou'')) like ''%''|| LOWER(TRANSLATE('''|| PI_BUSCAR ||''',''ÁÉÍÓÚáéíóú'',''AEIOUaeiou'')) ||''%'' AND
                        R.FLAG_ESTADO = ''' || PI_FLAG_ESTADO || '''
                        )
                    WHERE  ROWNUMBER BETWEEN ' || TO_CHAR(PI_REGISTROS * vPAGINA_INICIAL + 1) || ' AND ' || TO_CHAR(PI_REGISTROS * (vPAGINA_INICIAL + 1));
    
    OPEN PO_REF FOR vQUERY_SELECT;
  END USP_SEL_LISTA_BUSQ_VEH_CONV;
  
  --SECCION TIPO VEHICULO ELECTRICO
  PROCEDURE USP_SEL_LISTA_BUSQ_VEH_ELEC(
    PI_BUSCAR VARCHAR2,
	PI_FLAG_ESTADO VARCHAR,
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
                    FROM T_GENM_TIPO_VEHICULO_ELEC R
                    WHERE LOWER(TRANSLATE(R.NOMBRE,''ÁÉÍÓÚáéíóú'',''AEIOUaeiou'')) like ''%''|| LOWER(TRANSLATE('''|| PI_BUSCAR ||''',''ÁÉÍÓÚáéíóú'',''AEIOUaeiou'')) ||''%'' AND
                    R.FLAG_ESTADO = ''' || PI_FLAG_ESTADO || '''';
    EXECUTE IMMEDIATE vQUERY_CONT INTO vTOTAL_REG;
    
    vPAGINA_TOTAL := CEIL(TO_NUMBER(vTOTAL_REG) / TO_NUMBER(PI_REGISTROS));
    IF vPAGINA_ACTUAL = 0 THEN
      vPAGINA_ACTUAL := 1;
    END IF;
    IF vPAGINA_ACTUAL > vPAGINA_TOTAL THEN
      vPAGINA_ACTUAL := vPAGINA_TOTAL;
    END IF;

    vPAGINA_INICIAL := vPAGINA_ACTUAL - 1;
    vCOLUMNA := PI_COLUMNA;
    
    vQUERY_SELECT := 'SELECT * FROM 
                        (
                        SELECT  R.ID_TIPO_VEHICULO_ELEC,
                                R.NOMBRE,
                                ROW_NUMBER() OVER (ORDER BY ' || vCOLUMNA || ' ' || PI_ORDEN ||') AS ROWNUMBER,'
                                || vPAGINA_TOTAL || ' AS TOTAL_PAGINAS,'
                                || vPAGINA_ACTUAL || ' AS PAGINA,'
                                || PI_REGISTROS || ' AS CANTIDAD_REGISTROS,'
                                || vTOTAL_REG || ' AS TOTAL_REGISTROS
                        FROM T_GENM_TIPO_VEHICULO_ELEC R
                        WHERE LOWER(TRANSLATE(R.NOMBRE,''ÁÉÍÓÚáéíóú'',''AEIOUaeiou'')) like ''%''|| LOWER(TRANSLATE('''|| PI_BUSCAR ||''',''ÁÉÍÓÚáéíóú'',''AEIOUaeiou'')) ||''%'' AND
                        R.FLAG_ESTADO = ''' || PI_FLAG_ESTADO || '''
                        )
                    WHERE  ROWNUMBER BETWEEN ' || TO_CHAR(PI_REGISTROS * vPAGINA_INICIAL + 1) || ' AND ' || TO_CHAR(PI_REGISTROS * (vPAGINA_INICIAL + 1));
    
    OPEN PO_REF FOR vQUERY_SELECT;
  END USP_SEL_LISTA_BUSQ_VEH_ELEC;
  
  --SECCION TIPO TRANSPORTE
  PROCEDURE USP_SEL_LISTA_BUSQ_TRANSP(
    PI_BUSCAR VARCHAR2,
	PI_FLAG_ESTADO VARCHAR,
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
                    FROM T_GENM_TIPO_TRANSPORTE
                    WHERE LOWER(TRANSLATE(NOMBRE,''ÁÉÍÓÚáéíóú'',''AEIOUaeiou'')) like ''%''|| LOWER(TRANSLATE('''|| PI_BUSCAR ||''',''ÁÉÍÓÚáéíóú'',''AEIOUaeiou'')) ||''%'' AND
                    FLAG_ESTADO = ''' || PI_FLAG_ESTADO || '''';
    EXECUTE IMMEDIATE vQUERY_CONT INTO vTOTAL_REG;
    
    vPAGINA_TOTAL := CEIL(TO_NUMBER(vTOTAL_REG) / TO_NUMBER(PI_REGISTROS));
    IF vPAGINA_ACTUAL = 0 THEN
      vPAGINA_ACTUAL := 1;
    END IF;
    IF vPAGINA_ACTUAL > vPAGINA_TOTAL THEN
      vPAGINA_ACTUAL := vPAGINA_TOTAL;
    END IF;

    vPAGINA_INICIAL := vPAGINA_ACTUAL - 1;
    vCOLUMNA := PI_COLUMNA;
    
    vQUERY_SELECT := 'SELECT * FROM 
                        (
                        SELECT  ID_TIPO_TRANSPORTE,
                                NOMBRE,
                                ROW_NUMBER() OVER (ORDER BY ' || vCOLUMNA || ' ' || PI_ORDEN ||') AS ROWNUMBER,'
                                || vPAGINA_TOTAL || ' AS TOTAL_PAGINAS,'
                                || vPAGINA_ACTUAL || ' AS PAGINA,'
                                || PI_REGISTROS || ' AS CANTIDAD_REGISTROS,'
                                || vTOTAL_REG || ' AS TOTAL_REGISTROS
                        FROM T_GENM_TIPO_TRANSPORTE
                        WHERE LOWER(TRANSLATE(NOMBRE,''ÁÉÍÓÚáéíóú'',''AEIOUaeiou'')) like ''%''|| LOWER(TRANSLATE('''|| PI_BUSCAR ||''',''ÁÉÍÓÚáéíóú'',''AEIOUaeiou'')) ||''%'' AND
                        FLAG_ESTADO = ''' || PI_FLAG_ESTADO || '''
                        )
                    WHERE  ROWNUMBER BETWEEN ' || TO_CHAR(PI_REGISTROS * vPAGINA_INICIAL + 1) || ' AND ' || TO_CHAR(PI_REGISTROS * (vPAGINA_INICIAL + 1));
    
    OPEN PO_REF FOR vQUERY_SELECT;
  END USP_SEL_LISTA_BUSQ_TRANSP;
  