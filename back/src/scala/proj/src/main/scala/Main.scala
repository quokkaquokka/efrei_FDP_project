import org.apache.spark.sql.SparkSession
import Iterator
/*
 * Created by Kevin NAGELS on 8/04/2020
 */
object Main extends App {

  test("/home/monsieur/Documents/testScala.json","{\"text\":\"Welcome to Misalut\"}", "/home/monsieur/Documents/testScalaOut.json")


  def test(JsonPathInput:String, request:String, JsonPathOutput:String){

    val spark = SparkSession
      .builder()
      .appName("Objet")
      .config("spark.master", "local")
      .getOrCreate();

    // Primitive types (Int, String, etc) and Product types (case classes) encoders are
    // supported by importing this when creating a Dataset.

    // A JSON dataset is pointed to by path.
    // The path can be either a single text file or a directory storing text files
    val path = JsonPathInput
    val peopleDF = spark.read.json(path)

    // DEBUG see format and content of the dataframe
    peopleDF.printSchema()
    peopleDF.show()

    // Creates a temporary view using the DataFrame
    peopleDF.createOrReplaceTempView("people")

    val query = "SELECT * FROM people "+processRequest(request)

    //DEBUG
    print(query)

    if(query=="SELECT * FROM people "){

      // Sql research on the vue, giving new dataFrame
      val resultDF = spark.sql(query)

      resultDF.show()

      resultDF.write.mode("overwrite").json(JsonPathOutput)

    }else{

      //We want nothing in our JSON
      val defaultQuery = "SELECT * FROM people WHERE 1=0"

      // Sql research on the vue, giving new dataFrame
      val resultDF = spark.sql(query)

      resultDF.show()

      resultDF.write.mode("overwrite").json(JsonPathOutput)
    }
  }

  def processRequest(request:String):String={

    val requestArray = request.split(Array(':','{','}',',')).iterator


    requestArray.next()
    val requests=reccursiv(requestArray, "")

    //DEBUG
    println(requests)

    return requests
  }

  def reccursiv(iterator: Iterator[String], toReturn: String):String={



    if(iterator.hasNext){//We assume the array si always even
      val firstElement = iterator.next()
      if(!iterator.hasNext){
        return "error : last element was "+firstElement
      }
      val secondElement =iterator.next()



      if(secondElement==""){
        println("error "+firstElement)
        reccursiv(iterator,toReturn)

      }
      else{
        if(toReturn==""){

          //DEBUG
          println(toReturn+"WHERE " + firstElement.split('"')(1) + " == " + secondElement)

          reccursiv(iterator,toReturn + "WHERE " + firstElement.split('"')(1) + " == " + secondElement)

        }else{

          //DEBUG
          println(toReturn + " AND " + firstElement.split('"')(1) + " == " + secondElement)

          reccursiv(iterator,toReturn + " AND " + firstElement.split('"')(1) + " == " + secondElement)
        }
      }
    }
    else{
      return toReturn
    }
  }
}