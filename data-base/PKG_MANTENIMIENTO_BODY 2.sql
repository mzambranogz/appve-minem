  PROCEDURE USP_SEL_LISTA_BUSQ_USUARIO(
    PI_BUSCAR VARCHAR2,
	PI_FLAG_ESTADO VARCHAR2,
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
                    FROM T_GENM_USUARIO U
                    INNER JOIN T_MAE_ROL R ON U.ID_ROL = R.ID_ROL
                    WHERE (
                    LOWER(TRANSLATE(U.NOMBRES,''ÁÉÍÓÚáéíóú'',''AEIOUaeiou'')) like ''%''|| LOWER(TRANSLATE('''|| PI_BUSCAR ||''',''ÁÉÍÓÚáéíóú'',''AEIOUaeiou'')) ||''%'' OR
                    LOWER(TRANSLATE(U.CORREO,''ÁÉÍÓÚáéíóú'',''AEIOUaeiou'')) like ''%''|| LOWER(TRANSLATE('''|| PI_BUSCAR ||''',''ÁÉÍÓÚáéíóú'',''AEIOUaeiou'')) ||''%'' OR
                    LOWER(TRANSLATE(R.NOMBRE,''ÁÉÍÓÚáéíóú'',''AEIOUaeiou'')) like ''%''|| LOWER(TRANSLATE('''|| PI_BUSCAR ||''',''ÁÉÍÓÚáéíóú'',''AEIOUaeiou'')) ||''%''
                    U.FLAG_ESTADO = ''' || PI_FLAG_ESTADO ||'''
					)';
    EXECUTE IMMEDIATE vQUERY_CONT INTO vTOTAL_REG;

    vPAGINA_TOTAL := CEIL(TO_NUMBER(vTOTAL_REG) / TO_NUMBER(PI_REGISTROS));
    IF vPAGINA_ACTUAL = 0 THEN
      vPAGINA_ACTUAL := 1;
    END IF;
    IF vPAGINA_ACTUAL > vPAGINA_TOTAL THEN
      vPAGINA_ACTUAL := vPAGINA_TOTAL;
    END IF;

    vPAGINA_INICIAL := vPAGINA_ACTUAL - 1;
    IF PI_COLUMNA = 'PERFIL' THEN
      vCOLUMNA := 'R.NOMBRE';
    END IF;
    IF PI_COLUMNA = 'ESTADO' THEN
      vCOLUMNA := 'U.FLAG_ESTADO';
    ELSE
      vCOLUMNA := PI_COLUMNA;
    END IF;

    vQUERY_SELECT := 'SELECT * FROM
                        (
                        SELECT  U.ID_USUARIO,
                                U.NOMBRES,
                                U.CORREO,
                                U.ID_ROL,
                                R.NOMBRE NOMBRE_ROL,
                                U.FLAG_ESTADO,
                                ROW_NUMBER() OVER (ORDER BY ' || vCOLUMNA || ' ' || PI_ORDEN ||') AS ROWNUMBER,'
                                || vPAGINA_TOTAL || ' AS TOTAL_PAGINAS,'
                                || vPAGINA_ACTUAL || ' AS PAGINA,'
                                || PI_REGISTROS || ' AS CANTIDAD_REGISTROS,'
                                || vTOTAL_REG || ' AS TOTAL_REGISTROS
                        FROM T_GENM_USUARIO U
                        INNER JOIN T_MAE_ROL R ON U.ID_ROL = R.ID_ROL
                        WHERE (
                        LOWER(TRANSLATE(U.NOMBRES,''ÁÉÍÓÚáéíóú'',''AEIOUaeiou'')) like ''%''|| LOWER(TRANSLATE('''|| PI_BUSCAR ||''',''ÁÉÍÓÚáéíóú'',''AEIOUaeiou'')) ||''%'' OR
                        LOWER(TRANSLATE(U.CORREO,''ÁÉÍÓÚáéíóú'',''AEIOUaeiou'')) like ''%''|| LOWER(TRANSLATE('''|| PI_BUSCAR ||''',''ÁÉÍÓÚáéíóú'',''AEIOUaeiou'')) ||''%'' OR
                        LOWER(TRANSLATE(R.NOMBRE,''ÁÉÍÓÚáéíóú'',''AEIOUaeiou'')) like ''%''|| LOWER(TRANSLATE('''|| PI_BUSCAR ||''',''ÁÉÍÓÚáéíóú'',''AEIOUaeiou'')) ||''%''
                        U.FLAG_ESTADO = ''' || PI_FLAG_ESTADO ||'''
						)
                        )
                    WHERE  ROWNUMBER BETWEEN ' || TO_CHAR(PI_REGISTROS * vPAGINA_INICIAL + 1) || ' AND ' || TO_CHAR(PI_REGISTROS * (vPAGINA_INICIAL + 1));

    OPEN PO_REF FOR vQUERY_SELECT;
  END USP_SEL_LISTA_BUSQ_USUARIO;
  
  
  PROCEDURE USP_DEL_USUARIO(
    PI_ID_USUARIO NUMBER,
    PI_UPD_USUARIO NUMBER
  ) AS
  BEGIN
    UPDATE T_GENM_USUARIO
    SET FLAG_ESTADO = '0',
    UPD_USUARIO = PI_UPD_USUARIO,
    UPD_FECHA = SYSDATE
    WHERE ID_USUARIO = PI_ID_USUARIO;
  END USP_DEL_USUARIO;  
  
  PROCEDURE USP_SEL_LISTA_BUSQ_ROL(
    PI_BUSCAR VARCHAR2,
	PI_FLAG_ESTADO VARCHAR2,
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
                    FROM T_MAE_ROL R
                    WHERE LOWER(TRANSLATE(R.NOMBRE,''ÁÉÍÓÚáéíóú'',''AEIOUaeiou'')) like ''%''|| LOWER(TRANSLATE('''|| PI_BUSCAR ||''',''ÁÉÍÓÚáéíóú'',''AEIOUaeiou'')) ||''%'' AND
					R.FLAG_ESTADO = ''' || PI_FLAG_ESTADO ||'''';
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
                        SELECT  R.ID_ROL,
                                R.NOMBRE,
                                ROW_NUMBER() OVER (ORDER BY ' || vCOLUMNA || ' ' || PI_ORDEN ||') AS ROWNUMBER,'
                                || vPAGINA_TOTAL || ' AS TOTAL_PAGINAS,'
                                || vPAGINA_ACTUAL || ' AS PAGINA,'
                                || PI_REGISTROS || ' AS CANTIDAD_REGISTROS,'
                                || vTOTAL_REG || ' AS TOTAL_REGISTROS
                        FROM T_MAE_ROL R
                        WHERE LOWER(TRANSLATE(R.NOMBRE,''ÁÉÍÓÚáéíóú'',''AEIOUaeiou'')) like ''%''|| LOWER(TRANSLATE('''|| PI_BUSCAR ||''',''ÁÉÍÓÚáéíóú'',''AEIOUaeiou'')) ||''%'' AND
						R.FLAG_ESTADO = ''' || PI_FLAG_ESTADO ||'''
                        )
                    WHERE  ROWNUMBER BETWEEN ' || TO_CHAR(PI_REGISTROS * vPAGINA_INICIAL + 1) || ' AND ' || TO_CHAR(PI_REGISTROS * (vPAGINA_INICIAL + 1));
    
    OPEN PO_REF FOR vQUERY_SELECT;
  END USP_SEL_LISTA_BUSQ_ROL;

  PROCEDURE USP_SEL_LIST_ROL(
    PO OUT SYS_REFCURSOR
  ) AS
  BEGIN
    OPEN PO FOR
    SELECT * FROM T_MAE_ROL
	WHERE FLAG_ESTADO = '1'					   
    ORDER BY NOMBRES;
  END USP_SEL_LIST_ROL;  

  PROCEDURE USP_DEL_ROL(
    PI_ID_ROL NUMBER,
    PI_UPD_USUARIO NUMBER
  ) AS
  BEGIN
    UPDATE T_MAE_ROL
    SET FLAG_ESTADO = '0',
    UPD_USUARIO = PI_UPD_USUARIO,
    UPD_FECHA = SYSDATE
    WHERE ID_ROL = PI_ID_ROL;
  END USP_DEL_ROL; 
