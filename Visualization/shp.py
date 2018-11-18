import geopandas
import pandas as pd
import matplotlib.pyplot as plt
import shapely
from shapely.geometry import Point
from shapely import wkt


df = pd.DataFrame({'City': ['Toronto', 'Calgary', 'Vancouver', 'Ottawa', 'St.John', "St. John"],
	'Latitude': [43.6532, 51.0486, 49.2827, 45.4315, 45.2733, 45.2733],
	'Longitude': [-79.3832, -114.0708, -123.1207, -75.6972, -66.063, -66.063]})

df['Coordinates'] = list(zip(df.Longitude, df.Latitude))
df['Coordinates'] = df['Coordinates'].apply(Point)


#gdf = geopandas.GeoDataFrame(df, geometry='Coordinates')
#print(df.head())
shp = geopandas.read_file(r"C:\Users\Mahesh\Documents\GitHub\GiftTheCode2018\CanadaSHP\gpr_000b11a_e.shp")
shp.plot();
plt.plot(df.Longitude,df.Latitude,'g*')
plt.show();