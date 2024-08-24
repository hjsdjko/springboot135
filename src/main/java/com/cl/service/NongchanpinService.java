package com.cl.service;

import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.service.IService;
import com.cl.utils.PageUtils;
import com.cl.entity.NongchanpinEntity;
import java.util.List;
import java.util.Map;
import org.apache.ibatis.annotations.Param;
import com.cl.entity.view.NongchanpinView;


/**
 * 农产品
 *
 * @author 
 * @email 
 * @date 2024-03-19 21:20:19
 */
public interface NongchanpinService extends IService<NongchanpinEntity> {

    PageUtils queryPage(Map<String, Object> params);
    
   	List<NongchanpinView> selectListView(Wrapper<NongchanpinEntity> wrapper);
   	
   	NongchanpinView selectView(@Param("ew") Wrapper<NongchanpinEntity> wrapper);
   	
   	PageUtils queryPage(Map<String, Object> params,Wrapper<NongchanpinEntity> wrapper);
   	

}

