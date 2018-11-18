import geopandas
import pandas as pd
import matplotlib.pyplot as plt
import shapely
from shapely.geometry import Point
from pyproj import Proj, transform
from shapely import wkt
import sqlite3


df = pd.DataFrame({'City': ['Toronto', 'Calgary', 'Vancouver', 'Ottawa', 'St.John', "St. John"],
	'Latitude': [43.6532, 51.0486, 49.2827, 45.4315, 45.2733, 45.2733],
	'Longitude': [-79.3832, -114.0708, -123.1207, -75.6972, -66.063, -66.063]})

#df.loc[-1] = ["city",-33.00,-33.00]
#df.index = df.index + 1
#connect to our DB and get relavant values
connection = sqlite3.connect(r"C:\Users\Mahesh\Documents\GitHub\GiftTheCode2018\Backend\GiftTheCode.db")
#print (connection)
cursor = connection.execute("select location,lat,long from Users")
#print (cursor)

row= cursor.fetchall()
for i in row:
	print (i)
	if i[1]==None or i[2] == None:
		pass
	else:
		#check to see if point is in northwest quardrant only then add it to df
		if 0.0 < i[1] <= 90.0 and -180.0 <= i[2] < 0:
			df.loc[-1] = [i[0],i[1],i[2]]
			df.index = df.index + 1
print (df)

df['Coordinates'] = list(zip(df.Longitude, df.Latitude))
df['Coordinates'] = df['Coordinates'].apply(Point)
print (df["Coordinates"])

#gdf = geopandas.GeoDataFrame(df, geometry='Coordinates')
shp = geopandas.read_file(r"C:\Users\Mahesh\Documents\GitHub\GiftTheCode2018\Visualization\Resources\gpr_000b11a_e.shp")
#print (shp.columns)
# print (Proj(shp.crs))
# print (shp["PRENAME"])

# for point in df["Coordinates"]:
# 	for province in shp.geometry:
# 		print (point.within(province))


shp.plot(linestyle="-.", linewidth=0.1);
plt.plot(df.Longitude,df.Latitude,'r*')
plt.title("UNPLUGGED TO CONNECT")
plt.xlabel("Longitude")
plt.ylabel("Latitude")
plt.savefig("map.png")
plt.show()



