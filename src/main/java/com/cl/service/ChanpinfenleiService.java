package com.cl.service;

import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.service.IService;
import com.cl.utils.PageUtils;
import com.cl.entity.ChanpinfenleiEntity;
import java.util.List;
import java.util.Map;
import org.apache.ibatis.annotations.Param;
import com.cl.entity.view.ChanpinfenleiView;


/**
 * 产品分类
 *
 * @author 
 * @email 
 * @date 2024-03-19 21:20:19
 */
public interface ChanpinfenleiService extends IService<ChanpinfenleiEntity> {

    PageUtils queryPage(Map<String, Object> params);
    
   	List<ChanpinfenleiView> selectListView(Wrapper<ChanpinfenleiEntity> wrapper);
   	
   	ChanpinfenleiView selectView(@Param("ew") Wrapper<ChanpinfenleiEntity> wrapper);
   	
   	PageUtils queryPage(Map<String, Object> params,Wrapper<ChanpinfenleiEntity> wrapper);
   	

}

