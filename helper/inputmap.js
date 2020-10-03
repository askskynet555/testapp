const dbToHtmlInputTypeMap
=
{
        "34" :
        {
            "name": "image",
            "max_length": "16",
            "precision": "0",
            "scale": "0",
            "is_nullable": "1",
            "html_input_type": "text"
        },
        "35" :
        {
            "name": "text",
            "max_length": "16",
            "precision": "0",
            "scale": "0",
            "is_nullable": "1",
            "html_input_type": "text"
        },
        "36" :
        {
            "name": "uniqueidentifier",
            "max_length": "16",
            "precision": "0",
            "scale": "0",
            "is_nullable": "1",
            "html_input_type": "text"
        },
        "40" :
        {
            "name": "date",
            "max_length": "3",
            "precision": "10",
            "scale": "0",
            "is_nullable": "1",
            "html_input_type": "date"
        },
        "41" :
        {
            "name": "time",
            "max_length": "5",
            "precision": "16",
            "scale": "7",
            "is_nullable": "1",
            "html_input_type": "time"
        },
        "42" :
        {
            "name": "datetime2",
            "max_length": "8",
            "precision": "27",
            "scale": "7",
            "is_nullable": "1",
            "html_input_type": "datetime-local"
        },
        "43" :
        {
            "name": "datetimeoffset",
            "max_length": "10",
            "precision": "34",
            "scale": "7",
            "is_nullable": "1",
            "html_input_type": "datetime-local"
        },
        "48" :
        {
            "name": "tinyint",
            "max_length": "1",
            "precision": "3",
            "scale": "0",
            "is_nullable": "1",
            "html_input_type": "number"
        },
        "52" :
        {
            "name": "smallint",
            "max_length": "2",
            "precision": "5",
            "scale": "0",
            "is_nullable": "1",
            "html_input_type": "number"
        },
        "56" :
        {
            "name": "int",
            "max_length": "4",
            "precision": "10",
            "scale": "0",
            "is_nullable": "1",
            "html_input_type": "number"
        },
        "58" :
        {
            "name": "smalldatetime",
            "max_length": "4",
            "precision": "16",
            "scale": "0",
            "is_nullable": "1",
            "html_input_type": "date"
        },
        "59" :
        {
            "name": "real",
            "max_length": "4",
            "precision": "24",
            "scale": "0",
            "is_nullable": "1",
            "html_input_type": "number"
        },
        "60" :
        {
            "name": "money",
            "max_length": "8",
            "precision": "19",
            "scale": "4",
            "is_nullable": "1",
            "html_input_type": "number"
        },
        "61" :
        {
            "name": "datetime",
            "max_length": "8",
            "precision": "23",
            "scale": "3",
            "is_nullable": "1",
            "html_input_type": "datetime"
        },
        "62" :
        {
            "name": "float",
            "max_length": "8",
            "precision": "53",
            "scale": "0",
            "is_nullable": "1",
            "html_input_type": "number"
        },
        "98" :
        {
            "name": "sql_variant",
            "max_length": "8016",
            "precision": "0",
            "scale": "0",
            "is_nullable": "1",
            "html_input_type": "text"
        },
        "99" :
        {
            "name": "ntext",
            "max_length": "16",
            "precision": "0",
            "scale": "0",
            "is_nullable": "1",
            "html_input_type": "text"
        },
        "104" :
        {
            "name": "bit",
            "max_length": "1",
            "precision": "1",
            "scale": "0",
            "is_nullable": "1",
            "html_input_type": "boolean"
        },
        "106" :
        {
            "name": "decimal",
            "max_length": "17",
            "precision": "38",
            "scale": "38",
            "is_nullable": "1",
            "html_input_type": "number"
        },
        "108" :
        {
            "name": "numeric",
            "max_length": "17",
            "precision": "38",
            "scale": "38",
            "is_nullable": "1",
            "html_input_type": "number"
        },
        "122" :
        {
            "name": "smallmoney",
            "max_length": "4",
            "precision": "10",
            "scale": "4",
            "is_nullable": "1",
            "html_input_type": "number"
        },
        "127" :
        {
            "name": "bigint",
            "max_length": "8",
            "precision": "19",
            "scale": "0",
            "is_nullable": "1",
            "html_input_type": "number"
        },
        "128" :
        {
            "name": "hierarchyid",
            "max_length": "892",
            "precision": "0",
            "scale": "0",
            "is_nullable": "1",
            "html_input_type": "text"
        },
        "129" :
        {
            "name": "geometry",
            "max_length": "-1",
            "precision": "0",
            "scale": "0",
            "is_nullable": "1",
            "html_input_type": "text"
        },
        "130" :
        {
            "name": "geography",
            "max_length": "-1",
            "precision": "0",
            "scale": "0",
            "is_nullable": "1",
            "html_input_type": "text"
        },
        "165" :
        {
            "name": "varbinary",
            "max_length": "8000",
            "precision": "0",
            "scale": "0",
            "is_nullable": "1",
            "html_input_type": "text"
        },
        "167" :
        {
            "name": "varchar",
            "max_length": "8000",
            "precision": "0",
            "scale": "0",
            "is_nullable": "1",
            "html_input_type": "text"
        },
        "173" :
        {
            "name": "binary",
            "max_length": "8000",
            "precision": "0",
            "scale": "0",
            "is_nullable": "1",
            "html_input_type": "text"
        },
        "175" :
        {
            "name": "char",
            "max_length": "8000",
            "precision": "0",
            "scale": "0",
            "is_nullable": "1",
            "html_input_type": "text"
        },
        "189" :
        {
            "name": "timestamp",
            "max_length": "8",
            "precision": "0",
            "scale": "0",
            "is_nullable": "0",
            "html_input_type": "text"
        },
        "231" :
        {
            "name": "nvarchar",
            "max_length": "8000",
            "precision": "0",
            "scale": "0",
            "is_nullable": "1",
            "html_input_type": "text"
        },
        "239" :
        {
            "name": "nchar",
            "max_length": "8000",
            "precision": "0",
            "scale": "0",
            "is_nullable": "1",
            "html_input_type": "text"
        },
        "241" :
        {
            "name": "xml",
            "max_length": "-1",
            "precision": "0",
            "scale": "0",
            "is_nullable": "1",
            "html_input_type": "text"
        },
        "256" :
        {
            "name": "sysname",
            "max_length": "256",
            "precision": "0",
            "scale": "0",
            "is_nullable": "0",
            "html_input_type": "text"
        }
    
}
;

module.exports = dbToHtmlInputTypeMap; 