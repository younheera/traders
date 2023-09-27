/**
 * @author jeongyearim
 * @create date 2023-09-26 14:11:26
 * @modify date 2023-09-26 14:11:26
 * @desc [좌표의 위도와 경도를 담는다.]
 */

package com.newus.traders.product.type;
public class Coordinates {
    private double latitude;
    private double longitude;

    // getter 및 setter 메서드

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }
}
